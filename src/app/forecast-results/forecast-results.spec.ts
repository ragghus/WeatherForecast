import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastResults } from './forecast-results';

describe('ForecastResults', () => {
  let component: ForecastResults;
  let fixture: ComponentFixture<ForecastResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastResults]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastResults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
