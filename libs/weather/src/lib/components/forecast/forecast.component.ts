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
import { ForecastByCityName } from '../../class/forecast-by-cityname';
import { ForecastByLatLong } from '../../class/forecast-by-latlong';
import { ForecastContext } from '../../class/forecast-context';
import { COUNTRIES } from '../../constants/country.const';
import { ForecastService } from '../../services/forecast.service';
import {
  CityPayload,
  LatitudeAndLongitude,
  WeatherDefinition,
} from '../../types/weather.interface';
import { ForecastDetailsComponent } from '../forecast-details/forecast-details.component';
import { FeatherModule } from 'angular-feather';

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
export class ForecastComponent extends ForecastContext implements OnInit {
  forecast$: Observable<WeatherDefinition[]>;
  userInputForm: FormGroup;
  countries: { name: string; code: string }[] = COUNTRIES;
  forecastDetails: WeatherDefinition;
  readonly #destroyRef = inject(DestroyRef);

  forecastService: ForecastService = inject(ForecastService);
  #fg: FormBuilder = inject(FormBuilder);

  private fetchWeatherForecast(): void {
    this.forecast$ = this.forecastService.getForecast(this.performForecast());
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
    let forecastByCityName = new ForecastByCityName(cityPayload);
    this.setForecastStrategy(forecastByCityName);
    this.fetchWeatherForecast();
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
      .subscribe((cityGeographicCoordinate: LatitudeAndLongitude) => {
        const forecastByLatLong = new ForecastByLatLong(
          cityGeographicCoordinate,
        );
        // sets the default active strategy to forecast by latitude and longitude
        this.setForecastStrategy(forecastByLatLong);
        this.fetchWeatherForecast();
      });
  }
}
