import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap, map, elementAt } from "rxjs/operators";
import { ForecastResponse, WeatherApiResponse, ErrorResponse } from "./weather-model";

@Injectable (
    {
        providedIn: 'root'
    }
)

export class WeatherService {

    private apiKey = '61de6de44abec60f9b9f2b969bb83668';
    private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    private fiveDays_apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    private sixteenDays_apiUrl = 'https://api.open-meteo.com/v1/forecast';
    private geocodingAPI = "https://geocoding-api.open-meteo.com/v1/search";

    private currentWeatherCache: any = null;
    private fiveDayForecastCache: any = null;
    private sixteenDayForecastCache: any = null;

    constructor(private http:HttpClient) {}

    getWeather(city: string): Observable<ForecastResponse> {
        if (this.currentWeatherCache && this.currentWeatherCache.city === city) {
            return of(this.currentWeatherCache);
        }
        else
            return this.http
                .get<WeatherApiResponse>(`${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`)
                .pipe(tap((data:WeatherApiResponse)=>this.currentWeatherCache = {...data, city}),
                catchError((error): Observable<ErrorResponse> =>{
                    console.log("API Error:", error);
                    return of({error: true, message: "Data fetching error. Try with different city name/format"})
                })
            );
    }

    getFiveDayForecast(city: string): Observable<any> {
        if (this.fiveDayForecastCache && this.fiveDayForecastCache.city === city) {
            console.log("this.fiveDayForecastCache:",this.fiveDayForecastCache);
            return of(this.fiveDayForecastCache);
        }
        else
            return this.http
                .get(`${this.fiveDays_apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`)
                .pipe(
                map((res:any) => {
                    // Group data by date
                    const grouped: any = {};

                    res.list.forEach((entry: any) => {
                    const date = entry.dt_txt.split(" ")[0]; // "2025-08-19"
                    if (!grouped[date]) 
                        grouped[date] = [];
                    grouped[date].push(entry.main.temp_max);
                    });

                    // Convert to min/max per day
                    const daily = Object.keys(grouped)
                        .slice(0,5)
                        .map(date => {
                    return {
                        date,
                        min: Math.min(...grouped[date]),
                        max: Math.max(...grouped[date])
                    }
                    });

                    return daily;
                }),
      catchError(err => {
        console.error("Forecast API error:", err);
        return of([{ date: '', min: 0, max: 0, error: true, message: "Unable to fetch forecast" }]);
      })
    );
  }

  getSixteenDayForecast(city: string): Observable<any> {
    if(this.sixteenDayForecastCache && this.sixteenDayForecastCache == city) {
        console.log("No change in city name.", this.sixteenDayForecastCache)
        return of(this.sixteenDayForecastCache)
    }
    else {
        var lat:number = 0;
        var long:number = 0;
        this.http.get<any>(`${this.geocodingAPI}?name=${city}&count=1`).subscribe (resp => {
            if (resp.results && resp.results.length > 0) {
                console.log("geocoding resp:", resp);
                lat = resp.results[0].latitude
                long = resp.results[0].longitude;
                console.log("Lat:",lat, "Long:",long);
            }
        })
        return this.http
            .get(`${this.sixteenDays_apiUrl}?latitude=${lat}&longitude=${long}&forecast_days=15&timezone=auto&daily=temperature_2m_max,temperature_2m_min`)
            .pipe (
                map((resp: any) => {
                    return resp.daily.time.map((date:any, i:any) => ({
                        date,
                        min: resp.daily.temperature_2m_min[i],
                        max: resp.daily.temperature_2m_max[i],
                        weather: resp.daily.we                      
                    }));
                })
            )
    }

  }


  clearCache() {
    this.currentWeatherCache = null;
    this.fiveDayForecastCache = null;
    }
}
