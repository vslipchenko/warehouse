import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TableComponent} from './table';
import {Product} from '../../models/product';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      quantity: 10,
      unitPrice: 25.99,
      description: 'Description 1',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    },
    {
      id: 2,
      name: 'Product 2',
      quantity: 5,
      unitPrice: 15.5,
      description: 'Description 2',
      createdAt: new Date('2023-01-02'),
      updatedAt: new Date('2023-01-02'),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;

    // Provide required input
    fixture.componentRef.setInput('products', mockProducts);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have products input property', () => {
    expect(component.products).toBeDefined();
  });

  it('should have editProduct output property', () => {
    expect(component.editProduct).toBeDefined();
  });

  it('should have deleteProduct output property', () => {
    expect(component.deleteProduct).toBeDefined();
  });

  it('should accept products array input', () => {
    expect(component.products()).toEqual(mockProducts);
  });

  it('should handle empty products array', () => {
    fixture.componentRef.setInput('products', []);
    fixture.detectChanges();

    expect(component.products()).toEqual([]);
  });

  it('should emit editProduct event', () => {
    spyOn(component.editProduct, 'emit');

    const productToEdit = mockProducts[0];
    component.editProduct.emit(productToEdit);

    expect(component.editProduct.emit).toHaveBeenCalledWith(productToEdit);
  });

  it('should emit deleteProduct event', () => {
    spyOn(component.deleteProduct, 'emit');

    const productToDelete = mockProducts[1];
    component.deleteProduct.emit(productToDelete);

    expect(component.deleteProduct.emit).toHaveBeenCalledWith(productToDelete);
  });
});
