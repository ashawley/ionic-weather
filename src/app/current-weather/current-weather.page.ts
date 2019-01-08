import { Component } from '@angular/core';

import { LoadingController } from '@ionic/angular';

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
    public loading: LoadingController,
    public iconMap: IconMapService,
    private weather: WeatherService
  ) {}

  async ionViewDidEnter() {
    const l = await this.loading.create({
      duration: 2000,
      message: 'Please wait...',
      translucent: true
    });
    l.present();
    this.weather.current().subscribe(w => {
      this.currentWeather = w;
      l.dismiss();
    });
  }
}
