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

  private defaultPosition = {
    coords: {
      latitude: 38.969730,
      longitude: -77.383873
    }
  };
  private cachedLocation;

  async current(): Promise<Coordinate> {
    const loc =
      this.cachedLocation
        || (this.platform.is('cordova')
           ? await this.geolocation.getCurrentPosition()
           : this.defaultPosition);
    this.cachedLocation = loc;
    return {
      longitude: loc.coords.longitude,
      latitude: loc.coords.latitude
    };
  }
}
