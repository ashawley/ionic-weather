import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { City } from '../models/city';
import { cities } from './cities';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss']
})
export class UserPreferencesComponent implements OnInit {

  constructor(private modal: ModalController) {}

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
    this.modal.dismiss();
  }

}
