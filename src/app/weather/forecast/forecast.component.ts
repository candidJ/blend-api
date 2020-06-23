import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable, throwError } from 'rxjs';
import { WeatherDefinition } from 'src/app/shared/interface/interface';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { COUNTRIES } from './country.const';
import { debounceTime, distinctUntilChanged, switchMap, catchError, combineLatest } from 'rxjs/operators';

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
    return this.forecast$ = this.forecastService.getForecastByLatLong();
  }

  public showWeatherDetails(forecast: WeatherDefinition) {
    console.log(forecast);
    this.forecastDetails = forecast;
    return { ...this.forecastDetails };
  }

  private watchUserInput() {
    return this.forecast$ = this.userInputForm.controls['city'].valueChanges
      .pipe(
        debounceTime(1000),
        // distinctUntilChanged(),
        switchMap((value) => {
          console.log(value);
          const payload = value;
          // value.country ? value.
          return this.forecastService.getForecastByCityName(payload);
        }),
        
        catchError(err => throwError(err))
      );
  }

  onSubmit(){
    const payload = this.userInputForm.value.city;
    return this.forecastService.getForecastByCityName(payload);
  }

  ngOnInit() {
    this.userInputForm = this._fg.group({
      city: new FormControl(null),
      country: new FormControl(null)
    });
    // this.watchUserInput();
    this.getUserCoordinates();
    console.log(this.userInputForm.controls['city']);


  }

}
