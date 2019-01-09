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

  ngOnInit() {
  }

  dismiss() {
    this.modal.dismiss();
  }

  save() {
    console.log(`save("${this.city.name}", ${this.useCelsius})`);
    this.userPreferences.setCity(this.city);
    this.userPreferences.setUseCelsius(this.useCelsius);
    this.modal.dismiss();
  }

}
