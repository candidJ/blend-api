import { ForecastStrategy } from './forecast-strategy.interface';

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