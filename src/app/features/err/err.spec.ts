import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Err } from './err';

describe('Err', () => {
  let component: Err;
  let fixture: ComponentFixture<Err>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Err],
    }).compileComponents();

    fixture = TestBed.createComponent(Err);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
