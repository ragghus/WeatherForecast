import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForecastResults } from "../forecast-results/forecast-results";
import { CityService } from '../city-service';

@Component({
  selector: 'app-weather-homepage',
  imports: [FormsModule, ForecastResults],
  templateUrl: './weather-homepage.html',
  styleUrl: './weather-homepage.css'
})
export class WeatherHomepage {
  city = ''
  lat = null
  long = null

  constructor (private cityService:CityService) {}

  searchCity() {
    if(this.city.trim()) {
      this.cityService.updateCity(this.city.trim());
      this.cityService.selectTab('current')
    }
  }

}
