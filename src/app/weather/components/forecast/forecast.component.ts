import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable, throwError } from "rxjs";

import { WeatherForecast } from "src/app/weather/class/weather-forecast";
import { ForecastByCityName } from "src/app/weather/class/forecast-by-cityname";
import { ForecastByLatLong } from "src/app/weather/class/forecast-by-latlong";
import { COUNTRIES } from "src/app/weather/constants/country.const";
import { ForecastService } from "src/app/weather/services/forecast.service";
import { ForecastStrategy } from "src/app/weather/types/forecast-strategy.interface";
import {
  CityPayload,
  WeatherDefinition,
} from "src/app/weather/types/weather.interface";

@Component({
  selector: "ba-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.scss"],
})
export class ForecastComponent extends WeatherForecast implements OnInit {
  public forecast$: Observable<WeatherDefinition[]>;
  public userInputForm: FormGroup;
  public countries: { name: string; code: string }[] = COUNTRIES;
  public forecastDetails: WeatherDefinition;

  private forecastStrategy: ForecastStrategy;
  private cityInfo: Partial<CityPayload>;

  constructor(
    public forecastService: ForecastService,
    private _fg: FormBuilder
  ) {
    super();
  }

  private getUserCoordinates() {
    // sets the active strategy to get forecast i.e by city name or lat long
    this.setForecastStrategy(this.forecastStrategy);
    // gets the active strategy and pass it to service to be consumed
    this.forecast$ = this.forecastService.getForecast(
      this.getForecastByStrategy()
    );
  }

  private userPayload(): Partial<CityPayload> {
    const formValue = this.cityInfo;
    let countryCode: string | null;
    if (formValue.country) {
      const country = this.countries.filter(
        (country) =>
          country.name.toLowerCase() === formValue.country.toLowerCase()
      );
      countryCode = country.length ? country[0]["code"] : null;
    }
    return {
      city: formValue.country
        ? `${formValue.city},${countryCode}`
        : formValue.city,
      unit: formValue.unit, // Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    };
  }

  private determineForecastStrategy(type: string) {
    switch (type) {
      case "latlong":
        this.forecastService.getCurrentLocation().subscribe((config) => {
          this.forecastStrategy = new ForecastByLatLong(config);
          this.getUserCoordinates();
        });
        break;
      case "cityname":
        const config: Partial<CityPayload> = this.userPayload();
        this.forecastStrategy = new ForecastByCityName(config);
        break;
      default:
        "latlong";
    }
  }

  public showWeatherDetails(forecast: WeatherDefinition) {
    console.log(forecast);
    this.forecastDetails = forecast;
    return { ...this.forecastDetails };
  }

  onSubmit(value: Partial<CityPayload>) {
    this.cityInfo = value;
    this.determineForecastStrategy("cityname");
    this.getUserCoordinates();
  }

  ngOnInit() {
    this.userInputForm = this._fg.group({
      city: new FormControl(null, Validators.required),
      country: new FormControl(null),
      unit: new FormControl("metric"),
    });
    this.determineForecastStrategy("latlong");
  }
}
