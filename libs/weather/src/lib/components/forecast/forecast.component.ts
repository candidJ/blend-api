import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { ForecastByCityName } from '../../class/forecast-by-cityname';
import { ForecastByLatLong } from '../../class/forecast-by-latlong';
import { ForecastContext } from '../../class/forecast-context';
import { COUNTRIES } from '../../constants/country.const';
import { ForecastService } from '../../services/forecast.service';
import { CityPayload, WeatherDefinition } from '../../types/weather.interface';

@Component({
  selector: 'ba-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent extends ForecastContext implements OnInit {
  forecast$: Observable<WeatherDefinition[]>;
  userInputForm: FormGroup;
  countries: { name: string; code: string }[] = COUNTRIES;
  forecastDetails: WeatherDefinition;

  constructor(
    public forecastService: ForecastService,
    private fg: FormBuilder,
  ) {
    super();
    this.userInputForm = this.fg.group({
      city: new FormControl(null, Validators.required),
      country: new FormControl(''),
      unit: new FormControl('metric'),
    });
  }

  private fetchWeatherForecast(): void {
    this.forecast$ = this.forecastService.getForecast(this.performForecast());
  }

  private userPayload(cityInfo: CityPayload): CityPayload {
    const { country, city, unit } = cityInfo;
    let countryCode: string | null = '';
    if (country) {
      const filteredCountry = _.filter(this.countries, country);
      countryCode = filteredCountry.length ? country[0] : null;
    }
    return {
      city: country ? `${city},${countryCode}` : city,
      country: '',
      unit: unit,
    };
  }

  onSubmit(userCityNameInput: CityPayload): void {
    const cityPayload: CityPayload = this.userPayload(userCityNameInput);
    let forecastByCityName = new ForecastByCityName(cityPayload);
    this.setForecastStrategy(forecastByCityName);
    this.fetchWeatherForecast();
  }

  ngOnInit(): void {
    this.forecastService.getCurrentLocation().subscribe((currentLocation) => {
      const forecastByLatLong = new ForecastByLatLong(currentLocation);
      // sets the default active strategy to forecast by latitude and longitude
      this.setForecastStrategy(forecastByLatLong);
      this.fetchWeatherForecast();
    });
  }
}
