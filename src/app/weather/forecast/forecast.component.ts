import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';
import { WeatherDefinition } from 'src/app/shared/interface/interface';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  public forecast$: Observable<WeatherDefinition[]>;
  public userInputForm: FormGroup;
  constructor(private forecastService: ForecastService, private _fg: FormBuilder) { }

  private getUserCoordinates() {
    return this.forecast$ = this.forecastService.getForecast();
  }

  ngOnInit() {
    this.getUserCoordinates();
    this.userInputForm = this._fg.group({
      userInput: new FormControl(null)
    })
  }

}
