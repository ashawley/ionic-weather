import { Component } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { Forecast } from '../models/forecast';
import { WeatherService } from '../services/weather/weather.service';
import { IconMapService } from '../services/icon-map/icon-map.service';
import { UserPreferencesComponent } from '../user-preferences/user-preferences.component';

@Component({
  selector: 'app-forecast',
  templateUrl: 'forecast.page.html',
  styleUrls: ['forecast.page.scss']
})
export class ForecastPage {
  forecast: Forecast;

  constructor(
    private modal: ModalController,
    public loading: LoadingController,
    public iconMap: IconMapService,
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
    this.weather.forecast().subscribe(f => {
      this.forecast = f;
      l.dismiss();
    });
  }
}
