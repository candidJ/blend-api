import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import {
  NgClass,
  AsyncPipe,
  DecimalPipe,
  TitleCasePipe,
} from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DateTimeFormatPipe } from '@blend-api/shared';
import { CityNameForecastStrategy } from '../../class/city-name-forecast-strategy';
import { CoordinateForecastStrategy } from '../../class/coordinate-forecast-strategy';
import { ForecastContext } from '../../class/forecast-context';
import { COUNTRIES } from '../../constants/country.const';
import { ForecastService } from '../../services/forecast.service';
import {
  CityPayload,
  WeatherDefinition,
} from '../../types/weather.interface';
import { ForecastDetailsComponent } from '../forecast-details/forecast-details.component';
import { FeatherModule } from 'angular-feather';
import { GeographicCoordinate } from '../../class/geographic-coordinate';
import { ForecastStrategy } from '../../types/forecast-strategy.interface';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'ba-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FeatherModule,
    NgClass,
    ForecastDetailsComponent,
    AsyncPipe,
    DecimalPipe,
    TitleCasePipe,
    DateTimeFormatPipe,
  ],
})
export class ForecastComponent implements OnInit {
  forecast$: Observable<WeatherDefinition[]>;
  userInputForm: FormGroup;
  countries: { name: string; code: string }[] = COUNTRIES;
  forecastDetails: WeatherDefinition;

  forecastService: ForecastService = inject(ForecastService);
  readonly #destroyRef = inject(DestroyRef);
  #fg: FormBuilder = inject(FormBuilder);

  private fetchWeatherForecastUsingStrategy(strategy: ForecastStrategy): void {
    const context = new ForecastContext(strategy);
    const queryParams$: Observable<HttpParams> =
      context.constructForecastQueryParams();
    this.forecast$ =
      this.forecastService.fetchFiveDayWeatherForecast(queryParams$);
  }

  private userPayload(cityInfo: CityPayload): CityPayload {
    const { country, city, units } = cityInfo;
    let countryCode: string | null = '';
    if (country) {
      const filteredCountry = this.countries.filter((c) => c.code === country);
      countryCode = filteredCountry.length ? country[0] : null;
    }
    return {
      city: country ? `${city},${countryCode}` : city,
      country: '',
      units: units,
    };
  }

  onSubmit(userCityNameInput: CityPayload): void {
    const cityPayload: CityPayload = this.userPayload(userCityNameInput);
    const cityNameForecastStrategy: ForecastStrategy =
      new CityNameForecastStrategy(cityPayload);
    this.fetchWeatherForecastUsingStrategy(cityNameForecastStrategy);
  }

  ngOnInit(): void {
    this.userInputForm = this.#fg.group({
      city: new FormControl(null, Validators.required),
      country: new FormControl(''),
      units: new FormControl('imperial', Validators.required),
    });
    this.forecastService
      .getCurrentLocation()
      .pipe(first(), takeUntilDestroyed(this.#destroyRef))
      .subscribe((coordinate: GeographicCoordinate) => {
        const coordinateForecastStrategy: ForecastStrategy =
          new CoordinateForecastStrategy(coordinate);
        this.fetchWeatherForecastUsingStrategy(coordinateForecastStrategy);
      });
  }
}
