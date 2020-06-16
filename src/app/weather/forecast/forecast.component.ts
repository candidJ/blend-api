import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';
import { WeatherDefinition } from 'src/app/shared/interface/interface';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  public forecast$: Observable<WeatherDefinition[]>;
  constructor(private forecastService: ForecastService) { }

  private getUserCoordinates() {
    return this.forecast$ = this.forecastService.getForecast();
  }

  ngOnInit() {
    this.getUserCoordinates();
  }

}
