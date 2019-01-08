import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Forecast } from '../../models/forecast';
import { Weather } from '../../models/weather';
import { UVIndex } from '../..//models/uv-index';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  private appId = '69f068bb8bf2bc3e061cb2b62c255c65'; // or use your own API key
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  private latitude = 38.969730;
  private longitude = -77.383873;

  current(): Observable<Weather> {
    return this.http.get(
      `${this.baseUrl}/weather?lat=${this.latitude}&lon=${
        this.longitude
      }&appid=${this.appId}`
      ).pipe(map(res => this.unpackWeather(res)));
  }

  forecast(): Observable<Forecast> {
    return this.http.get(
      `${this.baseUrl}/forecast?lat=${this.latitude}&lon=${
        this.longitude
      }&appid=${this.appId}`
      ).pipe(map(res => this.unpackForecast(res)));
  }

  uvIndex(): Observable<UVIndex> {
    return this.http.get(
      `${this.baseUrl}/uvi?lat=${this.latitude}&lon=${
        this.longitude
      }&appid=${this.appId}`
      ).pipe(map(res => this.unpackUvIndex(res)));
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
    let riskValue: number = res.value;
    let calculatedLevel: number;  
    if (riskValue < 3) {
      calculatedLevel = 0;
    } else if (3 <= riskValue && riskValue < 6) {
      calculatedLevel = 1;
    } else if (6 <= riskValue && riskValue < 8) {
      calculatedLevel = 2;
    } else if (8 <= riskValue && riskValue < 11) {
      calculatedLevel = 3;
    } else if (riskValue >= 11) {
      calculatedLevel = 4;
    }
    return {
      value: riskValue,
      riskLevel: calculatedLevel
    };
  }
}
