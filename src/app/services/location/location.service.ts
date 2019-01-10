import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular'

import { Coordinate } from '../../models/coordinate';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(
    private geolocation: Geolocation,
    private platform: Platform
  ) {}

  private defaultPosition: Coordinate = {
    latitude: 38.969730,
    longitude: -77.383873
  };
  private cachedLocation;

  private getCurrentPositionWebApi(): Promise<Coordinate> {
    if ('geolocation' in navigator) {
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
          p => resolve({
            latitude: p.coords.latitude,
            longitude: p.coords.longitude
          }),
          err => reject(err)
        )
      );
    }
    return Promise.resolve(this.defaultPosition);
  }

  async current(): Promise<Coordinate> {
    let coords =
      this.cachedLocation ||
           (this.platform.is('cordova')
           ? await this.geolocation.getCurrentPosition()
           : await this.getCurrentPositionWebApi());
    this.cachedLocation = coords;
    return {
      longitude: coords.longitude,
      latitude: coords.latitude
    };
  }
}
