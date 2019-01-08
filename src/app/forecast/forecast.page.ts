import { Component } from '@angular/core';

import { Forecast } from '../models/forecast';
import { WeatherService } from '../services/weather/weather.service';
import { IconMapService } from '../services/icon-map/icon-map.service';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage {
  forecast: Forecast;

  constructor(
    public iconMap: IconMapService,
    private weather: WeatherService
  ) {}

  ionViewDidEnter() {
    this.weather.forecast().subscribe(f => (this.forecast = f));
  }
}
