import { Component } from '@angular/core';

import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { WeatherService } from '../services/weather/weather.service';
import { UVIndex } from '../models/uv-index';
import { UserPreferencesComponent } from '../user-preferences/user-preferences.component';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-uv-index',
  templateUrl: 'uv-index.page.html',
  styleUrls: ['uv-index.page.scss']
})
export class UVIndexPage {
  uvIndex: UVIndex;

  cityName: string;

  scale: string;

  private subscription: Subscription;

  advice: Array<string> = [
    'Wear sunglasses on bright days. If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen. ' +
      'Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Stay in the shade near midday when the sun is strongest. If outdoors, wear sun protective clothing, ' +
      'a wide-brimmed hat, and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, ' +
      'even on cloudy days, and after swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Reduce time in the sun between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, ' +
      'and after swimming or sweating. Bright surfaces, such sand, water and snow, will increase UV exposure.',
    'Minimize sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after ' +
      'swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.',
    'Try to avoid sun exposure between 10 a.m. and 4 p.m. If outdoors, seek shade and wear sun protective clothing, a wide-brimmed hat, ' +
      'and UV-blocking sunglasses. Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, ' +
      'and after swimming or sweating. Bright surfaces, such as sand, water and snow, will increase UV exposure.'
  ];

  constructor(
    private modal: ModalController,
    public loading: LoadingController,
    private userPreferences: UserPreferencesService,
    private weather: WeatherService
  ) {}

  ngOnInit() {
    this.subscription = this.userPreferences.changed.subscribe(() =>
      this.getData()
    );
  }

  ionViewDidEnter() {
    this.getData();
  }

  async openUserPreferences(): Promise<void> {
    const m = await this.modal.create({ component: UserPreferencesComponent });
    await m.present();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private async getData() {
    const l = await this.loading.create({
      duration: 2000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    l.present();
    this.cityName = (await this.userPreferences.getCity()).name;
    this.scale = (await this.userPreferences.getUseCelsius()) ? 'C' : 'F';
    this.weather.uvIndex().subscribe(i => {
      this.uvIndex = i;
      l.dismiss();
    });
  }
}
