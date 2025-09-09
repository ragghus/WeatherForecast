import { Routes } from "@angular/router";
import { WeatherHomepage } from "./weather-homepage/weather-homepage";
import { ForecastResults } from "./forecast-results/forecast-results";

const routeConfig: Routes = [
{
    path: '',
    component: WeatherHomepage,
    title: "Weather Forecast Homepage"
},    
// {
//     path:'results/',
//     component:ForecastResults,
//     title: "Weather Forecast for the City"
// },

];

export default routeConfig;