import { Component, OnInit } from '@angular/core';
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
  constructor(
    private weatherService: WeatherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.data = this.route.params.pipe(
      map((params) => params['locationName']),
      filter((name) => !!name),
      tap(() => {
        this.loading = true;
      }),
      concatMap((name) => this.weatherService.getWeatherForCity(name)),
      tap((info) => {
        this.weatherService.coordsSubject.next([
          info.coord.lat,
          info.coord.lon,
        ]);
        this.loading = false;
      })
    );
  }
}
