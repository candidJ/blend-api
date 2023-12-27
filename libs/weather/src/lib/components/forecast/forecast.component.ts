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
  private cityInfo: CityPayload;

  constructor(
    public forecastService: ForecastService,
    private fg: FormBuilder
  ) {
    super();
    this.userInputForm = this.fg.group({
      city: new FormControl(null, Validators.required),
      country: new FormControl(""),
      unit: new FormControl('metric'),
    });
  }

  private getUserCoordinates() : void {
    // sets the active strategy to get forecast i.e by city name or lat long
    this.setForecastStrategy(this.forecastStrategy);
    // gets the active strategy and pass it to service to be consumed
    this.forecast$ = this.forecastService.getForecast(
      this.getForecastByStrategy()
    );
  }

  private userPayload(): CityPayload {
    const {country, city, unit} = this.cityInfo;
    let countryCode: string | null = '';
    if (country) {
      const filteredCountry = _.filter(this.countries, country);
      countryCode = filteredCountry.length ? country[0] : null;
    }
    return {
      city: country ? `${city},${countryCode}` : city,
      country: '',
      unit: unit, // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    };
  }

  private determineForecastStrategy(type: string) : void {
    switch (type) {
      case 'latlong':
        this.forecastService.getCurrentLocation().subscribe((config) => {
          this.forecastStrategy = new ForecastByLatLong(config);
          this.getUserCoordinates();
        });
        break;
      case 'cityname':
        const config: CityPayload = this.userPayload();
        this.forecastStrategy = new ForecastByCityName(config);
        break;
      default:
        'latlong';
    }
  }

  onSubmit(value: CityPayload) : void {
    this.cityInfo = value;
    this.determineForecastStrategy('cityname');
    this.getUserCoordinates();
  }

  ngOnInit() : void {
    this.determineForecastStrategy('latlong');
  }
}
