import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable, throwError } from 'rxjs';
import { WeatherDefinition } from 'src/app/shared/interface/interface';
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
    // return this.forecast$ = this.forecastService.getForecastByLatLong();
  }

  public showWeatherDetails(forecast: WeatherDefinition) {
    console.log(forecast);
    this.forecastDetails = forecast;
    return { ...this.forecastDetails };
  }


  onSubmit() {
    const payload = this.userInputForm.value.city;
    // return this.forecastService.getForecastByCityName(payload);
    this.determineForecastStrategy("cityname");
    // this.forecastService.getForecast();
  }

  private determineForecastStrategy(type: string) {
    switch (type) {
      case "latlong":
        this.forecastStrategy = new ForecastByLatLong();
        console.log(new ForecastByLatLong());
        break;
      case "cityname":
        this.forecastStrategy = new ForecastByCityName("delhi");
        break;
      default: "latlong";
    }
  }

  ngOnInit() {
    this.userInputForm = this._fg.group({
      city: new FormControl(null),
      country: new FormControl(null)
    });
    this.determineForecastStrategy("latlong");
    this.setForecastStrategy(this.forecastStrategy);
    this.forecast$ = this.forecastService.getForecast(this.getForecastByStrategy());
  }

}



