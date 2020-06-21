import { Component, OnInit, Input } from '@angular/core';
import { WeatherDefinition } from 'src/app/shared/interface/interface';

@Component({
  selector: 'app-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.scss']
})
export class ForecastDetailsComponent implements OnInit {

  @Input('details')
  forecastDetails: WeatherDefinition;

  constructor() { }

  ngOnInit(): void {
    console.log(this.forecastDetails);
  }

}
