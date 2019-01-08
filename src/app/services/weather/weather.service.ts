import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { flatMap } from 'rxjs/operators';

import { LocationService } from '../../services/location/location.service';

import { Forecast } from '../../models/forecast';
import { Weather } from '../../models/weather';
import { UVIndex } from '../../models/uv-index';
import { Coordinate } from '../../models/coordinate';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(
    private http: HttpClient,
    private location: LocationService
  ) {}

  private appId = 'a895e31039049c15d405c5c541128194'; // or use your own API key
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  private getCurrentLocation(): Observable<Coordinate> {
    return from(this.location.current());
  }

  current(): Observable<Weather> {
    return this.getCurrentLocation().pipe(
      flatMap((coord: Coordinate) =>
        this.getCurrentWeather(coord)
      )
    );
  }

  private getCurrentWeather(coord: Coordinate): Observable<Weather> {
    return this.http.get(
        `${this.baseUrl}/weather?lat=${coord.latitude}&lon=${
          coord.longitude
        }&appid=${this.appId}`
      )
      .pipe(map(res => this.unpackWeather(res)));
  }

  forecast(): Observable<Forecast> {
    return this.getCurrentLocation().pipe(
      flatMap(coord => this.getCurrentForecast(coord))
    );
  }

  private getCurrentForecast(coord: Coordinate): Observable<Forecast> {
    return this.http.get(
        `${this.baseUrl}/forecast?lat=${coord.latitude}&lon=${
          coord.longitude
        }&appid=${this.appId}`
      )
      .pipe(map((res: any) => this.unpackForecast(res)));
  }

  uvIndex(): Observable<UVIndex> {
    return this.getCurrentLocation().pipe(
      flatMap(coord => this.getCurrentUvIndex(coord))
    );
  }

  private getCurrentUvIndex(coord: Coordinate): Observable<UVIndex> {
    return this.http.get(
        `${this.baseUrl}/uvi?lat=${coord.latitude}&lon=${
          coord.longitude
        }&appid=${this.appId}`
      )
      .pipe(map((res: any) => this.unpackUvIndex(res)));
  }

  private unpackWeather(res: any): Weather {
    return {
      temperature: res.main.temp,
      condition: res.weather[0].id,
      date: new Date(res.dt * 1000)
    };
  }

  private unpackForecast(res: any): Forecast {
    let currentDay: Array<Weather>;
    let prevDate: number;
    const forecast: Forecast = [];

    res.list.forEach(item => {
      const w = this.unpackWeather(item);
      if (w.date.getDate() !== prevDate) {
        prevDate = w.date.getDate();
        currentDay = [];
        forecast.push(currentDay);
      }
      currentDay.push(w);
    });

    return forecast;
  }

  private unpackUvIndex(res: any): UVIndex {
    return {
      value: res.value,
      riskLevel: this.riskLevel(res.value)
    };
  }

  private riskLevel(value: number): number {
    if (value < 3)                    return 0;
    if (3 <= value && value < 6)      return 1;
    if (6 <= value && value < 8)      return 2;
    if (8 <= value && value < 11)     return 3;
    /* if (value >= 11) */            return 4;
  }
}
