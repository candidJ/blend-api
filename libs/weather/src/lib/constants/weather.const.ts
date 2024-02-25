import { TemperatureMeasurementUnits } from '../types/weather.interface';

export const WEATHER_API_CONFIG: {
  URL: string;
  API_KEY: string;
  UNITS: TemperatureMeasurementUnits;
} = {
  URL: 'https://api.openweathermap.org/data/2.5/forecast',
  API_KEY: 'eff556784983bcac5c6d749bad8e1090',
  UNITS: 'imperial',
};
