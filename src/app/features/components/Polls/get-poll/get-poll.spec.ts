import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPoll } from './get-poll';

describe('GetPoll', () => {
  let component: GetPoll;
  let fixture: ComponentFixture<GetPoll>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetPoll],
    }).compileComponents();

    fixture = TestBed.createComponent(GetPoll);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
