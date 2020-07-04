import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CITIES } from './cities.const';
import { CityPayload } from 'src/app/shared/interface/interface';

interface CityInfo {
  city: string;
  country: string;
}

@Component({
  selector: 'app-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.scss']
})
export class ForecastDetailsComponent implements OnInit {

  public threeCities: Partial<CityPayload>[] = [];
  private cities = CITIES;

  @Output('cityInfo') sendCityInfo = new EventEmitter();

  constructor() { }

  private generateThreeRandomCities() {
    for (let i = 1; i <= 5; i++) {
      this.threeCities.push(this.cities[Math.floor(Math.random() * (this.cities.length - 1))]);
    }
  }

  public onCityClick(info: Partial<CityPayload>): void {
    this.sendCityInfo.emit(info);
  }

  ngOnInit(): void {
    this.generateThreeRandomCities();
  }

}
