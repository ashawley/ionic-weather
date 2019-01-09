import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { cities } from '../../user-preferences/cities';
import { City } from '../../models/city';

@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {
  private keys = {
    useCelsius: 'useCelsius',
    city: 'city'
  };
  private _useCelsius: boolean;

  private _city: City;

  constructor(private storage: Storage) {}

  async getUseCelsius(): Promise<boolean> {
    await this.storage.ready();
    if (this._useCelsius === undefined) {
      this._useCelsius = await this.storage.get(this.keys.useCelsius);
    }
    return this._useCelsius;
  }

  async setUseCelsius(value: boolean): Promise<void> {
    await this.storage.ready();
    this._useCelsius = value;
    this.storage.set(this.keys.useCelsius, value);
  }

  async getCity(): Promise<City> {
    await this.storage.ready();
    if (this._city === undefined) {
      this._city = await this.storage.get(this.keys.city);
    }
    return this._city;
  }

  async setCity(value: City): Promise<void> {
    await this.storage.ready();
    this._city = value;
    await this.storage.set(this.keys.city, value);
  }
}