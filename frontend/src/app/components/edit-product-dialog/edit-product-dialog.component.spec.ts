import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {signal} from '@angular/core';
import {EditProductDialogComponent} from './edit-product-dialog.component';
import {GraphqlService} from '../../services/graphql.service';
import {Product} from '../../models/product';

describe('EditProductDialogComponent', () => {
  let component: EditProductDialogComponent;
  let fixture: ComponentFixture<EditProductDialogComponent>;
  let mockGraphqlService: jasmine.SpyObj<GraphqlService>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    quantity: 10,
    unitPrice: 25.99,
    description: 'Test description',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  };

  beforeEach(async () => {
    const graphqlServiceSpy = jasmine.createSpyObj('GraphqlService', [
      'updateProduct',
    ]);

    await TestBed.configureTestingModule({
      imports: [EditProductDialogComponent, ReactiveFormsModule],
      providers: [{provide: GraphqlService, useValue: graphqlServiceSpy}],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProductDialogComponent);
    component = fixture.componentInstance;
    mockGraphqlService = TestBed.inject(
      GraphqlService
    ) as jasmine.SpyObj<GraphqlService>;

    // Provide required inputs
    const visibleSignal = signal(false);
    fixture.componentRef.setInput('visible', visibleSignal);
    fixture.componentRef.setInput('product', mockProduct);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required inputs', () => {
    expect(component.visible).toBeDefined();
    expect(component.product).toBeDefined();
  });

  it('should have GraphQL service injected', () => {
    expect(mockGraphqlService).toBeDefined();
  });

  it('should have form initialized', () => {
    expect((component as any).form).toBeDefined();
  });

  it('should have loading signal', () => {
    expect((component as any).loading).toBeDefined();
  });

  it('should have error signal', () => {
    expect((component as any).error).toBeDefined();
  });

  it('should have saveChanges method', () => {
    expect((component as any).saveChanges).toBeDefined();
  });
});
