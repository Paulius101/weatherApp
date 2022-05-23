import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';
import {} from 'googlemaps';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss'],
})
export class WeatherAppComponent implements OnInit, OnDestroy {
  public cityControl = new FormControl('');
  public searchCityControl = new FormControl('');
  public cities?: string[];
  public lat?: number;
  public lon?: number;
  public getWeatherForCitySub?: Subscription;
  public getWeatherByCoordinatesSub?: Subscription;
  public cityControlSub?: Subscription;

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {
    this.getLocation();
    this.cities = this.weatherService.getCities;
    this.cityControlSub = this.cityControl.valueChanges.subscribe((value) => {
      this.router.navigate([value]);
    });
    this.weatherService.resetCityControl.subscribe((res) => {
      if (res === 'reset') this.cityControl.setValue('');
    });
    this.weatherService.resetSearchCityControl.subscribe((res) => {
      if (res === 'reset') this.searchCityControl.setValue('');
    });
  }

  getLocation() {
    //If the user agrees to share their location, we use their coordinates to get the weather and navigate to weather-output component.
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition((res) => {
        this.lat = res.coords.latitude;
        this.lon = res.coords.longitude;
        this.weatherService.coordsSubject.next([this.lat, this.lon]);
        this.getWeatherByCoordinatesSub = this.weatherService
          .getWeatherByCoordinates(this.lat, this.lon)
          .subscribe({
            next: (value) => {
              this.cityControl.setValue('');
              this.searchCityControl.setValue('');
              this.router.navigate([value.name]);
            },
            error: (err) => {
              return window.alert(err.error.message);
            },
          });
      });
    } else {
      //If they do not agree, get weather for default city.
      this.getWeatherForCitySub = this.weatherService
        .getWeatherForCity('Vilnius')
        .subscribe({
          next: (value) => {
            this.weatherService.coordsSubject.next([
              value.coord.lat,
              value.coord.lon,
            ]);
            this.router.navigate([value.name]);
          },
          error: (err) => {
            return window.alert(err.error.message);
          },
        });
    }
  }

  onSelect() {
    this.searchCityControl.setValue('');
  }

  searchForCity() {
    this.getWeatherForCitySub = this.weatherService
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

  ngOnDestroy(): void {
    if (this.getWeatherByCoordinatesSub) {
      this.getWeatherByCoordinatesSub.unsubscribe();
    }
    if (this.getWeatherForCitySub) {
      this.getWeatherForCitySub.unsubscribe();
    }
    if (this.cityControlSub) {
      this.cityControlSub.unsubscribe();
    }
  }
}
