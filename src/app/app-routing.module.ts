import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherOutputComponent } from './weatherApp/weather-output/weather-output.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherOutputComponent,
  },
  {
    path: ':locationName',
    component: WeatherOutputComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
