import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  private appId = '69f068bb8bf2bc3e061cb2b62c255c65'; // or use your own API key
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  private latitude = 38.969730;
  private longitude = -77.383873;

  current(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/weather?lat=${this.latitude}&lon=${
        this.longitude
      }&appid=${this.appId}`);
  }

}
