import { Component, OnInit } from '@angular/core';
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
  public cityControl = new FormControl('');
  public searchCityControl = new FormControl('');
  public cities?: string[];
  public lat?: number;
  public lon?: number;

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {
    this.getLocation();
    this.cities = this.weatherService.getCities;
    this.cityControl.valueChanges.subscribe((value) => {
      this.router.navigate([value]);
    });
  }

  getLocation() {
    //If the user agrees to share their location, we use their coordinates to get the weather and navigate to weather-output component.
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
      //If they do not agree, get weather for default city.
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
