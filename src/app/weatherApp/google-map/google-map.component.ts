import {
  AfterViewInit,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') mapElement: any;
  map?: google.maps.Map;
  constructor(private weatherService: WeatherService, private router: Router) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
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
      google.maps.event.addListener(this.map!, 'click', (event) => {
        const mapProperties = {
          center: new google.maps.LatLng(
            event.latLng.lat(),
            event.latLng.lng()
          ),
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapProperties
        );
      });
    });
  }

  onClick() {
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
