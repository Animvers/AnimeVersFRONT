import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animeall } from './animeall';

describe('Animeall', () => {
  let component: Animeall;
  let fixture: ComponentFixture<Animeall>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animeall],
    }).compileComponents();

    fixture = TestBed.createComponent(Animeall);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
