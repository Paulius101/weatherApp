import { Component, OnInit } from '@angular/core';
import { CoreModule } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, map, mergeMap, Observable, tap } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-output',
  templateUrl: './weather-output.component.html',
  styleUrls: ['./weather-output.component.scss'],
})
export class WeatherOutputComponent implements OnInit {
  public data?: Observable<any>;
  public todayDate: number = Date.now();
  public loading?: boolean;
  public showDailyReport: boolean = false;
  public city?: string;
  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Gets the city name (required in template), makes the API call for weather in that city. Also sets a couple property values, which control template rendering.
    this.data = this.route.params.pipe(
      map((params) => params['locationName']),
      filter((name) => !!name),
      tap((name) => {
        this.city = name;
        this.loading = true;
      }),
      concatMap((name) => this.weatherService.getWeatherForCity(name)),
      tap((info) => {
        this.weatherService.coordsSubject.next([
          info.coord.lat,
          info.coord.lon,
        ]);
        this.showDailyReport = false;
        this.loading = false;
      })
    );
  }

  multipleDayRequest() {
    //Gets weather data for multiple days. Actual response of API call maintains more than daily info.
    if (!this.showDailyReport) {
      this.data = this.data?.pipe(
        tap(() => {
          this.loading = true;
        }),
        concatMap((res) =>
          this.weatherService.getMultipleDayWeather(
            res.coord.lat,
            res.coord.lon
          )
        ),
        tap(() => {
          this.showDailyReport = true;
          this.loading = false;
        })
      );
    } else {
      this.data = this.data?.pipe(
        tap(() => {
          this.loading = true;
        }),
        concatMap(() => this.weatherService.getWeatherForCity(this.city!)),
        tap(() => {
          this.showDailyReport = false;
          this.loading = false;
        })
      );
    }
  }
}
