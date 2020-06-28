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
  public countries: { "name": string; "code-en": string }[] = COUNTRIES;
  public forecastDetails: WeatherDefinition;
  private forecastStrategy: ForecastStrategy;

  constructor(private forecastService: ForecastService, private _fg: FormBuilder) {
    super();
  }

  private getUserCoordinates() {
    this.setForecastStrategy(this.forecastStrategy);
    this.forecast$ = this.forecastService.getForecast(this.getForecastByStrategy());
  }

  private userPayload(): Partial<CityPayload> {

    const formValue = this.userInputForm.value;
    return {
      city: formValue.country ? `${formValue.city},${this.countries.filter(country => country.name === formValue.country)[0]["code-en"]}`
        : formValue.city,
      unit: formValue.unit // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    };
  }

  private determineForecastStrategy(type: string) {
    switch (type) {
      case "latlong":
        this.forecastStrategy = new ForecastByLatLong();
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


  onSubmit() {
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
    this.getUserCoordinates();
  }

}
