import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';
import { WeatherDefinition } from 'src/app/shared/interface/interface';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { COUNTRIES } from './country.const';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  public forecast$: Observable<WeatherDefinition[]>;
  public userInputForm: FormGroup;
  public countries: { "name": string; "code-en": string }[] = COUNTRIES;
  public forecastDetails: WeatherDefinition;
  constructor(private forecastService: ForecastService, private _fg: FormBuilder) { }

  private getUserCoordinates() {
    return this.forecast$ = this.forecastService.getForecast();
  }

  public showWeatherDetails(forecast: WeatherDefinition) {
    console.log(forecast);
    this.forecastDetails = forecast;
    return { ...this.forecastDetails };
  }

  ngOnInit() {
    this.getUserCoordinates();
    this.userInputForm = this._fg.group({
      city: new FormControl(null),
      country: new FormControl(null)
    });
  }

}
