import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorBannerComponent } from './error-banner';

describe('ErrorBannerComponent', () => {
  let component: ErrorBannerComponent;
  let fixture: ComponentFixture<ErrorBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorBannerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorBannerComponent);
    component = fixture.componentInstance;
    
    // Provide required inputs
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('message', 'Test error message');
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have visible input property', () => {
    expect(component.visible).toBeDefined();
  });

  it('should have message input property', () => {
    expect(component.message).toBeDefined();
  });

  it('should accept boolean visible input', () => {
    expect(typeof component.visible()).toBe('boolean');
  });

  it('should accept string message input', () => {
    expect(typeof component.message()).toBe('string');
  });

  it('should handle visible state changes', () => {
    fixture.componentRef.setInput('visible', false);
    fixture.detectChanges();
    
    expect(component.visible()).toBe(false);
    
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();
    
    expect(component.visible()).toBe(true);
  });

  it('should handle message changes', () => {
    const newMessage = 'Updated error message';
    fixture.componentRef.setInput('message', newMessage);
    fixture.detectChanges();
    
    expect(component.message()).toBe(newMessage);
  });
});