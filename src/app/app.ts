import { Component, signal } from '@angular/core';
import { RouterModule} from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template:`
    <main>
      <a [routerLink]="['/']">
        <header>
          <img src="/assets/Weather-Forecast-Logo.png" alt="logo" width="100" height="100"/> 
        </header>
      </a>
    <section> 
      <router-outlet></router-outlet>
    </section>
    </main>`,
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('weather-forecast-app');
}
