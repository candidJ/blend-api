/**
 * Units of measurement
 * Imperial - Fahrenheit
 * Metric - Celsius
 * Standard - Kelvin
 *
 * The mathematical formulas to convert temperature are:
 * Fahrenheit to Celsius: (F – 32) ÷ 1.8 = C.
 * Celsius to Fahrenheit: (C × 1.8) + 32 = F.
 */

export type TemperatureMeasurementUnits = 'imperial' | 'metric' | 'standard';

export interface CityPayload {
  city: string;
  unit: TemperatureMeasurementUnits;
  country: string;
}

export interface GeolocationCoordinates {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
}

type ForecastDateFormat = 'YYYY-MM-DD hh:mm:ss';

export interface CityWeather {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
  id: number;
  timezone: number;
}
interface MainTemperatureResponse {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherItem {
  dt_txt: ForecastDateFormat;
  main: MainTemperatureResponse;
  weather: Weather[];
  wind: {
    speed: number;
    deg: number;
  };
}
export interface WeatherResponse {
  list: WeatherItem[];
  city: CityWeather;
}

export interface WeatherDefinition {
  currentTemp: number;
  feelsLike: number;
  minTemp: number;
  maxTemp: number;
  humidity: number;
  title: string;
  description: string;
  date: ForecastDateFormat;
  id: number;
  city: string;
  country: string;
  sunrise: Date;
  sunset: Date;
  windSpeed: number;
  windDeg: number;
  icon?: string;
}
