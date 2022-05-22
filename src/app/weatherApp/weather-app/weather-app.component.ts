import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';
import {} from 'googlemaps';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss'],
})
export class WeatherAppComponent implements OnInit {
  public cityControl = new FormControl('Pasirinkti miestą');
  public searchCityControl = new FormControl('');
  public cities: string[];
  public lat?: number;
  public lon?: number;

  constructor(private weatherService: WeatherService, private router: Router) {
    this.cities = [];
  }

  ngOnInit(): void {
    this.getLocation();
    this.cities = this.weatherService.getCities;
    this.cityControl.valueChanges.subscribe((value) => {
      this.router.navigate([value]);
    });
  }

  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((res) => {
        this.lat = res.coords.latitude;
        this.lon = res.coords.longitude;
        this.weatherService.coordsSubject.next([this.lat, this.lon]);
        this.weatherService
          .getWeatherByCoordinates(this.lat, this.lon)
          .subscribe((value) => {
            this.router.navigate([value.name]);
          });
      });
    } else {
      this.weatherService.getWeatherForCity('Vilnius').subscribe((value) => {
        this.weatherService.coordsSubject.next([
          value.coord.lat,
          value.coord.lon,
        ]);
        this.router.navigate([value.name]);
      });
    }
  }

  searchForCity() {
    this.weatherService
      .getWeatherForCity(this.searchCityControl.value)
      .subscribe((value) => {
        this.weatherService.coordsSubject.next([
          value.coord.lat,
          value.coord.lon,
        ]);
        this.router.navigate([value.name]);
      });
    this.cityControl.setValue('');
  }
}
