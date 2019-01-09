import { Component } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { WeatherService } from '../services/weather/weather.service';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { Weather } from '../models/weather';
import { UserPreferencesComponent } from '../user-preferences/user-preferences.component';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: 'current-weather.page.html',
  styleUrls: ['current-weather.page.scss']
})
export class CurrentWeatherPage {
  currentWeather: Weather;

  cityName: string;

  scale: string;

  constructor(
    private modal: ModalController,
    public loading: LoadingController,
    public iconMap: IconMapService,
    private userPreferences: UserPreferencesService,
    private weather: WeatherService
  ) {}

  async openUserPreferences(): Promise<void> {
    const m = await this.modal.create({ component: UserPreferencesComponent });
    await m.present();
  }

  async ionViewDidEnter() {
    const l = await this.loading.create({
      duration: 2000,
      message: 'Please wait...',
      translucent: true
    });
    l.present();
    this.cityName = (await this.userPreferences.getCity()).name;
    this.scale = (await this.userPreferences.getUseCelsius()) ? 'C' : 'F';
    this.weather.current().subscribe(w => {
      this.currentWeather = w;
      l.dismiss();
    });
  }
}
