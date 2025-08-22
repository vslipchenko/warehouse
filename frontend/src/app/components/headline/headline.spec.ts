import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadlineComponent } from './headline';

describe('HeadlineComponent', () => {
  let component: HeadlineComponent;
  let fixture: ComponentFixture<HeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadlineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadlineComponent);
    component = fixture.componentInstance;

    // Provide required input
    fixture.componentRef.setInput('addProductButtonDisabled', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have addProductButtonDisabled input property', () => {
    expect(component.addProductButtonDisabled).toBeDefined();
  });

  it('should have addProduct output property', () => {
    expect(component.addProduct).toBeDefined();
  });

  it('should accept boolean addProductButtonDisabled input', () => {
    expect(typeof component.addProductButtonDisabled()).toBe('boolean');
  });

  it('should emit addProduct event', () => {
    spyOn(component.addProduct, 'emit');

    component.addProduct.emit();

    expect(component.addProduct.emit).toHaveBeenCalled();
  });

  it('should handle disabled state correctly', () => {
    fixture.componentRef.setInput('addProductButtonDisabled', true);
    fixture.detectChanges();

    expect(component.addProductButtonDisabled()).toBe(true);
  });

  it('should handle enabled state correctly', () => {
    fixture.componentRef.setInput('addProductButtonDisabled', false);
    fixture.detectChanges();

    expect(component.addProductButtonDisabled()).toBe(false);
  });
});
