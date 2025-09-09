import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherHomepage } from './weather-homepage';

describe('WeatherHomepage', () => {
  let component: WeatherHomepage;
  let fixture: ComponentFixture<WeatherHomepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherHomepage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherHomepage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
