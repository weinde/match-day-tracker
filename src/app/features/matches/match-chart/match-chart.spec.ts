import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchChart } from './match-chart';

describe('MatchChart', () => {
  let component: MatchChart;
  let fixture: ComponentFixture<MatchChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchChart],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
