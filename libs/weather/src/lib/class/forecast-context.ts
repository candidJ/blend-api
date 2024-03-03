import { ForecastStrategy } from '../types/forecast-strategy.interface';

// Strategy pattern - create a base class which sets and gets the strategy of concrete classes
export class ForecastContext {
  readonly #forecastStrategy: ForecastStrategy;

  constructor(forecastStrategy: ForecastStrategy) {
    this.#forecastStrategy = forecastStrategy;
  }

  constructForecastQueryParams() {
    return this.#forecastStrategy.getForecastParams();
  }
}
