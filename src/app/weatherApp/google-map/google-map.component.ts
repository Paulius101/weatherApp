import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements AfterViewInit {
  @ViewChild('map') mapElement: any;
  public map?: google.maps.Map;

  constructor(private weatherService: WeatherService, private router: Router) {}

  ngAfterViewInit(): void {
    //Creates a map initially.
    this.weatherService.coordsSubject.subscribe((coords) => {
      const mapProperties = {
        center: new google.maps.LatLng(coords[0], coords[1]),
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };
      this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        mapProperties
      );
    });
  }

  onClick() {
    //Takes lat/lng from click event on the map and creates a new map for the location (could refactor to a hostlistiner in a separate directive)
    google.maps.event.addListener(this.map!, 'click', (event) => {
      this.weatherService.coordsSubject.next([
        event.latLng.lat(),
        event.latLng.lng(),
      ]);
      this.weatherService
        .getWeatherByCoordinates(event.latLng.lat(), event.latLng.lng())
        .subscribe((value) => {
          this.router.navigate([value.name]);
        });
    });
  }
}
