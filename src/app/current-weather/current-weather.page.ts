import { Component } from '@angular/core';

import { WeatherService } from '../services/weather/weather.service';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { Weather } from '../models/weather';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage {
  currentWeather: Weather;

  constructor(
    public iconMap: IconMapService,
    private weather: WeatherService
  ) {}

  ionViewDidEnter() {
    this.weather.current().subscribe(w => (this.currentWeather = w));
  }
}
