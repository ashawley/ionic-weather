import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Coordinate } from '../../models/coordinate';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private geolocation: Geolocation) { }

  private defaultPosition = {
    coords: {
      latitude: 38.969730,
      longitude: -77.383873
    }
  };

  async current(): Promise<Coordinate> {
    const loc = this.platform.is('cordova')
      ? await this.geolocation.getCurrentPosition()
      : this.defaultPosition;
    return {
      longitude: loc.coords.longitude,
      latitude: loc.coords.latitude
    };
  }
}
