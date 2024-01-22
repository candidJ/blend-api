import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CITIES } from '../../constants/cities.const';
import { CityPayload } from '../../types/weather.interface';

@Component({
  selector: 'ba-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.scss'],
})
export class ForecastDetailsComponent implements OnInit {
  randomCities: Partial<CityPayload>[] = [];
  private cities = CITIES;
  private cityHashMap : Map<number, boolean> = new Map();

  @Output('cityInfo') sendCityInfo = new EventEmitter();

  constructor() {}

  private generateRandomCities() {
    for (let i = 0; i < 5; i++) {
      let randomHash = this.generateRandomHash();
      if(!this.cityHashMap.has(randomHash)) {
        this.cityHashMap.set(randomHash, true);
      } else {
        while(this.cityHashMap.has(randomHash)){
          randomHash = this.generateRandomHash();
        }
      }
      const randomCity = this.cities[randomHash];
      this.randomCities.push(randomCity);
    }
  }

  private generateRandomHash() : number {
    return Math.round(Math.random() * (this.cities.length - 1));
  }

  onCityClick(cityInfo: Partial<CityPayload>): void {
    this.sendCityInfo.emit(cityInfo);
  }

  ngOnInit(): void {
    this.generateRandomCities();
  }
}
