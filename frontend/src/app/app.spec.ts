import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { GraphqlService } from './services/graphql.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockGraphqlService: jasmine.SpyObj<GraphqlService>;

  beforeEach(async () => {
    const graphqlServiceSpy = jasmine.createSpyObj('GraphqlService', ['getProducts']);
    graphqlServiceSpy.getProducts.and.returnValue(of({ data: { products: [] } }));

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: GraphqlService, useValue: graphqlServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockGraphqlService = TestBed.inject(GraphqlService) as jasmine.SpyObj<GraphqlService>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have GraphQL service injected', () => {
    expect(mockGraphqlService).toBeDefined();
  });

  it('should call getProducts on initialization', () => {
    expect(mockGraphqlService.getProducts).toHaveBeenCalled();
  });

  it('should have loading signal', () => {
    expect((component as any).loading).toBeDefined();
  });

  it('should have error signal', () => {
    expect((component as any).error).toBeDefined();
  });

  it('should have products signal', () => {
    expect((component as any).products).toBeDefined();
  });

  it('should have dialog visibility signals', () => {
    expect((component as any).showAddProductDialog).toBeDefined();
    expect((component as any).showEditProductDialog).toBeDefined();
    expect((component as any).showDeleteProductDialog).toBeDefined();
  });

  it('should have dialog methods', () => {
    expect((component as any).openAddProductDialog).toBeDefined();
    expect((component as any).openEditProductDialog).toBeDefined();
    expect((component as any).confirmDeletion).toBeDefined();
  });

  it('should have loadProducts method', () => {
    expect((component as any).loadProducts).toBeDefined();
  });
});