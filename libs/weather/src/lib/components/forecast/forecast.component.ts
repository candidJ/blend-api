import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { ForecastByCityName } from '../../class/forecast-by-cityname';
import { ForecastByLatLong } from '../../class/forecast-by-latlong';
import { WeatherForecast } from '../../class/weather-forecast';
import { COUNTRIES } from '../../constants/country.const';
import { ForecastService } from '../../services/forecast.service';
import { ForecastStrategy } from '../../types/forecast-strategy.interface';
import { CityPayload, WeatherDefinition } from '../../types/weather.interface';

@Component({
  selector: 'ba-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent extends WeatherForecast implements OnInit {
  forecast$: Observable<WeatherDefinition[]>;
  userInputForm: FormGroup;
  countries: { name: string; code: string }[] = COUNTRIES;
  forecastDetails: WeatherDefinition;

  private forecastStrategy: ForecastStrategy;
  private cityInfo: Partial<CityPayload>;

  constructor(
    public forecastService: ForecastService,
    private _fg: FormBuilder
  ) {
    super();
    this.userInputForm = this._fg.group({
      city: new FormControl(null, Validators.required),
      country: new FormControl(null),
      unit: new FormControl('metric'),
    });
  }

  private getUserCoordinates() {
    // sets the active strategy to get forecast i.e by city name or lat long
    this.setForecastStrategy(this.forecastStrategy);
    // gets the active strategy and pass it to service to be consumed
    this.forecast$ = this.forecastService.getForecast(
      this.getForecastByStrategy()
    );
  }

  private userPayload(): Partial<CityPayload> {
    const formValue = this.cityInfo;
    let countryCode: string | null = '';
    if (formValue.country) {
      // const country = this.countries.filter(
      //   (country) =>
      //     country.name.toLowerCase() === formValue.country.toLowerCase()
      // );
      const country = _.filter(this.countries, formValue.country);
      countryCode = country.length ? country[0]['code'] : null;
    }
    return {
      city: formValue.country
        ? `${formValue.city},${countryCode}`
        : formValue.city,
      unit: formValue.unit, // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    };
  }

  private determineForecastStrategy(type: string) {
    switch (type) {
      case 'latlong':
        this.forecastService.getCurrentLocation().subscribe((config) => {
          this.forecastStrategy = new ForecastByLatLong(config);
          this.getUserCoordinates();
        });
        break;
      case 'cityname':
        const config: Partial<CityPayload> = this.userPayload();
        this.forecastStrategy = new ForecastByCityName(config);
        break;
      default:
        'latlong';
    }
  }

  showWeatherDetails(forecast: WeatherDefinition) {
    this.forecastDetails = forecast;
    return { ...this.forecastDetails };
  }

  onSubmit(value: Partial<CityPayload>) {
    this.cityInfo = value;
    this.determineForecastStrategy('cityname');
    this.getUserCoordinates();
  }

  ngOnInit() {
    this.determineForecastStrategy('latlong');
  }
}
