import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {signal} from '@angular/core';
import {AddProductDialogComponent} from './add-product-dialog';
import {GraphqlService} from '../../services/graphql.service';

describe('AddProductDialogComponent', () => {
  let component: AddProductDialogComponent;
  let fixture: ComponentFixture<AddProductDialogComponent>;
  let mockGraphqlService: jasmine.SpyObj<GraphqlService>;

  beforeEach(async () => {
    const graphqlServiceSpy = jasmine.createSpyObj('GraphqlService', [
      'createProduct',
    ]);

    await TestBed.configureTestingModule({
      imports: [AddProductDialogComponent, ReactiveFormsModule],
      providers: [{provide: GraphqlService, useValue: graphqlServiceSpy}],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductDialogComponent);
    component = fixture.componentInstance;
    mockGraphqlService = TestBed.inject(
      GraphqlService
    ) as jasmine.SpyObj<GraphqlService>;

    // Provide required input
    const visibleSignal = signal(false);
    fixture.componentRef.setInput('visible', visibleSignal);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have required inputs', () => {
    expect(component.visible).toBeDefined();
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

  it('should have addProduct method', () => {
    expect((component as any).addProduct).toBeDefined();
  });

  it('should have resetState method', () => {
    expect((component as any).resetState).toBeDefined();
  });
});
