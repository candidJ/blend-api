import { ForecastStrategy } from '../types/forecast-strategy.interface';

// Strategy pattern - create a base class which sets and gets the strategy of concrete classes
export class ForecastContext {
  private forecastStrategy: ForecastStrategy;

  performForecast() {
    return this.forecastStrategy.forecast();
  }

  setForecastStrategy(forecastStrategy: ForecastStrategy): void {
    this.forecastStrategy = forecastStrategy;
  }
}
