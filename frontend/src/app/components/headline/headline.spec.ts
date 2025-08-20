import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadlineComponent } from './headline';

describe('Headline', () => {
  let component: HeadlineComponent;
  let fixture: ComponentFixture<HeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadlineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
