import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  public forecast$: Observable<{ date: string; temp: number }[]>;
  constructor(private forecastService: ForecastService) { }

  public getUserCoordinates() {
    return this.forecast$ = this.forecastService.getForecast()
    // .subscribe((coords) => {
    //   console.log(coords);
    // });
  }

  ngOnInit() {
    this.getUserCoordinates();
  }

}
