export interface CityPayload {
  city: string;
  unit: 'imperial' | 'metric' | 'standard';
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

type ForecastDateFormat = "YYYY-MM-DD hh:mm:ss";

export interface IOpenWeatherResponse {
  list: {
    dt_txt: ForecastDateFormat;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    wind: {
      speed: number;
      deg: number;
    };
  }[];
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
    id: number;
    timezone: number;
  };
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
  units: string;
}
