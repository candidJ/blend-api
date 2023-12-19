import { ForecastStrategy } from '../types/forecast-strategy.interface';

// Strategy pattern - create a base class which sets and gets the strategy of concrete classes
export class WeatherForecast {
  private strategy: ForecastStrategy;

  getForecastByStrategy() {
    return this.strategy.forecast();
  }

  setForecastStrategy(strategy: ForecastStrategy) {
    this.strategy = strategy;
  }
}
