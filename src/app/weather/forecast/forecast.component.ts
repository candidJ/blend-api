import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable, throwError } from 'rxjs';
import { WeatherDefinition, CityPayload } from 'src/app/shared/interface/interface';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { COUNTRIES } from './country.const';
import { debounceTime, distinctUntilChanged, switchMap, catchError, combineLatest, tap } from 'rxjs/operators';
import { WeatherForecast } from '../weather-forecast';
import { ForecastStrategy } from '../forecast-strategy.interface';
import { ForecastByLatLong } from '../forecast-by-latlong';
import { ForecastByCityName } from '../forecast-by-cityname';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent extends WeatherForecast implements OnInit {

  public forecast$: Observable<WeatherDefinition[]>;
  public userInputForm: FormGroup;
  public countries: { "name": string; "code": string }[] = COUNTRIES;
  public forecastDetails: WeatherDefinition;

  private forecastStrategy: ForecastStrategy;
  private cityInfo: Partial<CityPayload>;

  constructor(public forecastService: ForecastService, private _fg: FormBuilder) {
    super();
  }

  private getUserCoordinates() {
    // sets the active strategy to get forecase i.e by city name or lat long
    this.setForecastStrategy(this.forecastStrategy);
    // gets the active strategy and pass it to service to be consumed
    this.forecast$ = this.forecastService.getForecast(this.getForecastByStrategy());
  }

  private userPayload(): Partial<CityPayload> {

    const formValue = this.cityInfo;
    let countryCode: string | null;
    if (formValue.country) {
      const country = this.countries.filter(country => country.name.toLowerCase() === formValue.country.toLowerCase());
      countryCode = country.length ? country[0]["code"] : null;
    }
    return {
      city: formValue.country ? `${formValue.city},${countryCode}`
        : formValue.city,
      unit: formValue.unit // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    };
  }

  private determineForecastStrategy(type: string) {
    switch (type) {
      case "latlong":
        this.forecastService.getCurrentLocation().subscribe((config) => {
          this.forecastStrategy = new ForecastByLatLong(config);
          this.getUserCoordinates();
        });
        break;
      case "cityname":
        const config: Partial<CityPayload> = this.userPayload();
        this.forecastStrategy = new ForecastByCityName(config);
        break;
      default: "latlong";
    }
  }

  public showWeatherDetails(forecast: WeatherDefinition) {
    console.log(forecast);
    this.forecastDetails = forecast;
    return { ...this.forecastDetails };
  }


  onSubmit(value: Partial<CityPayload>) {
    this.cityInfo = value;
    this.determineForecastStrategy("cityname");
    this.getUserCoordinates();
  }


  ngOnInit() {
    this.userInputForm = this._fg.group({
      city: new FormControl(null),
      country: new FormControl(null),
      unit: new FormControl(null)
    });
    this.determineForecastStrategy("latlong");
  }

}
