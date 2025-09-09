import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable (
    {
        providedIn: 'root'
    }
)

export class CityService {
    private citySubject = new BehaviorSubject<string>('');
    city$ = this.citySubject.asObservable();

    private latitudeSrc = new BehaviorSubject<number>(0.0); 
    private longitudeSrc = new BehaviorSubject<number>(0.0); 

    private selectedTab = new BehaviorSubject<'current' | '5-day' | '15-day'>('current');
    selectedTab$ = this.selectedTab.asObservable();

    updateCity(city: string) {
        this.citySubject.next(city);
    }

    updateLatLong(lat: number, long: number) {
        this.latitudeSrc.next(lat);
        this.longitudeSrc.next(long)
    }

    selectTab(tab: 'current' | '5-day' | '15-day') {
        this.selectedTab.next(tab)
  } 
}
