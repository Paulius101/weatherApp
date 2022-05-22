import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

//3rd party
import { FlexLayoutModule } from '@angular/flex-layout';
import { WeatherAppComponent } from './weatherApp/weather-app/weather-app.component';
import { GoogleMapComponent } from './weatherApp/google-map/google-map.component';

//Components and pipes
import { AppComponent } from './app.component';
import { WeatherOutputComponent } from './weatherApp/weather-output/weather-output.component';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WeatherAppComponent,
    WeatherOutputComponent,
    LocalizedDatePipe,
    GoogleMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    //Angular materials:
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
