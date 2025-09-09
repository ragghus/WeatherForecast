import { Component, Input, SimpleChanges } from '@angular/core';
import { WeatherService } from '../weather-service';
import { CityService } from '../city-service';
import { CommonModule} from '@angular/common';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-forecast-results',
  imports: [CommonModule],
  templateUrl: './forecast-results.html',
  styleUrl: './forecast-results.css'
})

export class ForecastResults {

  @Input() selectedTab : 'current' | '5-day' | '15-day' = 'current';
  tabContent: string = '';
  fiveDayForecast: any;
  sixteenDayForecast: any;
  weatherData: any;
  loading = false;
  errorMessage = '';

  constructor(
    public cityService: CityService,
    private weatherService: WeatherService
  ) {}
  
  ngOnInit() {
    this.weatherData = null;
    this.fiveDayForecast = null;
    this.sixteenDayForecast = null;
  // React only when city or tab changes
  this.cityService.city$.subscribe(city => {
    if (city) {
      this.getTabData(this.selectedTab, city); // pass city explicitly
    }
  });

  this.cityService.selectedTab$.subscribe(tab => {
    this.selectedTab = tab;
    this.cityService.city$.subscribe(city => {
      if (city) {
        this.getTabData(tab, city);
      }
    });
  });
}

getTabData(tab: 'current' | '5-day' | '15-day', city: string) {
  switch(tab) {
    case 'current':
      console.log("Selected Current Weather.")
      this.getCurrentWeather(city);
      break;

    case '5-day': 
      console.log("Selected 5-day forecast.")
      this.getFiveDaysForecast(city);
      break;

    case '15-day':
      console.log('Selected 16-day forecast.')
      this.getSixteenDaysForecast(city);
      break;
  }
}

getCurrentWeather(city: string) {
  this.fiveDayForecast = null;
  this.loading = true;
  this.weatherService.getWeather(city).subscribe({
    next: (res) => {
      this.loading = false;
      this.errorMessage = '';
      this.weatherData = res;
    },
    error: (err) => {
      this.loading = false;
      this.errorMessage = err.message;
    }
  });
}

getFiveDaysForecast(city: string) {
  this.weatherData = null;
  this.loading = true;
  this.weatherService.getFiveDayForecast(city).subscribe({
    next: (data) => {
      this.loading = false;
      if ((data as any).error) {
        this.errorMessage = (data as any).message;
      } else {        
          this.fiveDayForecast = data;
          this.errorMessage = ""
      }
    },
    error: (err) => {
      this.loading = false;
      this.errorMessage = err.message || "Error in fetching the data";
    }
  });
}

getSixteenDaysForecast(city: string) {
  this.weatherData = null;
  this.fiveDayForecast = null;
  this.loading = true;
  this.weatherService.getSixteenDayForecast(city).subscribe ({
    next: (data) => {
      this.loading = false;
      if((data as any).error) {
        this.errorMessage = (data as any).message;
      }
      else {
        this.sixteenDayForecast = data;
        this.errorMessage = '';
      }
    },
    error: (err) => {
      this.loading = false;
      this.errorMessage = err.message || "Error in fetching the data.";
    }
  });
}
}
