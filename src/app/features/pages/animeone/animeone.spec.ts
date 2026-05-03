import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animeone } from './animeone';

describe('Animeone', () => {
  let component: Animeone;
  let fixture: ComponentFixture<Animeone>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animeone],
    }).compileComponents();

    fixture = TestBed.createComponent(Animeone);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
