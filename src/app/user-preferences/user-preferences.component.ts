import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { City } from '../models/city';
import { cities } from '../services/user-preferences/cities';
import { UserPreferencesService } from '../services/user-preferences/user-preferences.service';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss']
})
export class UserPreferencesComponent implements OnInit {

  constructor(
    private userPreferences: UserPreferencesService,
    private modal: ModalController
  ) {}

  cities: Array<City> = cities;
  city: City = cities[0];
  useCelsius: boolean;

  async ngOnInit() {
    this.city = await this.userPreferences.getCity();
    this.useCelsius = await this.userPreferences.getUseCelsius();
  }

  dismiss() {
    this.modal.dismiss();
  }

  async save() {
    await Promise.all([
      this.userPreferences.setCity(this.city),
      this.userPreferences.setUseCelsius(this.useCelsius)
    ]);
    console.log(`save("${this.city.name}", ${this.useCelsius})`);
    this.modal.dismiss();
  }

}
