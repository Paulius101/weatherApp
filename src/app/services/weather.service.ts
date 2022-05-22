import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey: string = '0da871a4d5baef25083beade78885f75';
  private URL: string = 'https://api.openweathermap.org/data/2.5/weather';
  private cities: string[] = [
    'Vilnius',
    'Kaunas',
    'Klaipėda',
    'Šiauliai',
    'Panevėžys',
  ];
  public coordsSubject = new BehaviorSubject([1, 1]);

  constructor(private http: HttpClient) {}

  get getCities() {
    return this.cities;
  }

  getWeatherByCoordinates(lat: number, lon: number): Observable<any> {
    let params = new HttpParams()
      .append('lat', lat)
      .append('lon', lon)
      .append('units', 'metric')
      .append('lang', 'lt')
      .append('appid', this.apiKey);
    return this.http.get(this.URL, { params }).pipe(
      map((data: any) => ({
        ...data,
        image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      }))
    );
  }
  getWeatherForCity(city: string): Observable<any> {
    let params = new HttpParams()
      .append('q', city)
      .append('units', 'metric')
      .append('lang', 'lt')
      .append('appid', this.apiKey);
    return this.http.get(this.URL, { params }).pipe(
      map((data: any) => ({
        ...data,
        image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      })),
      delay(500)
    );
  }
}
