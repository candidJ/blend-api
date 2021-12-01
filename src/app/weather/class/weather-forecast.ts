import { ForecastStrategy } from "src/app/weather/types/forecast-strategy.interface";

// Strategy pattern - create a base class which sets and gets the strategy of concrete classes
export class WeatherForecast {
  private stratergy: ForecastStrategy;

  public getForecastByStrategy() {
    return this.stratergy.forecast();
  }

  public setForecastStrategy(strategy: ForecastStrategy) {
    this.stratergy = strategy;
    console.log(this.stratergy);
  }
}
