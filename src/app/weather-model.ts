
export interface WeatherApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: CityInfo;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: { all: number };
  wind: { speed: number; deg: number; gust: number };
  visibility: number;
  pop: number;
  sys: { pod: string };
  dt_txt: string;
}

export interface CityInfo {
  id: number;
  name: string;
  coord: { lat: number; lon: number };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ErrorResponse {
  error: true;
  message: string;
}

export interface DailyUnits {
  time: string;                 // "iso8601"
  temperature_2m_min: string;   // "°C"
  temperature_2m_max: string;   // "°C"
}

export interface DailyForecast {
  time: string[];               // ["2025-09-07", "2025-09-08", ...]
  temperature_2m_min: number[]; // [26.1, 25.8, ...]
  temperature_2m_max: number[]; // [33.7, 34.0, ...]
}

export interface OpenMeteoForecastResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: DailyUnits;
  daily: DailyForecast;
}

export type ForecastResponse = WeatherApiResponse | OpenMeteoForecastResponse | ErrorResponse;
