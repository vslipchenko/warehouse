import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProductDialogComponent } from './delete-product-dialog';

describe('DeleteProductDialog', () => {
  let component: DeleteProductDialogComponent;
  let fixture: ComponentFixture<DeleteProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteProductDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
