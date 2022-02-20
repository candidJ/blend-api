import { ForecastStrategy } from '../types/forecast-strategy.interface';

// Strategy pattern - create a base class which sets and gets the strategy of concrete classes
export class WeatherForecast {
  private strategy: ForecastStrategy;

  public getForecastByStrategy() {
    return this.strategy.forecast();
  }

  public setForecastStrategy(strategy: ForecastStrategy) {
    this.strategy = strategy;
    console.log(this.strategy);
  }
}
