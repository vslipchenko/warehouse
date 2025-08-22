import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar';
import { TableComponent } from './components/table/table';
import { FooterComponent } from './components/footer/footer';
import { HeadlineComponent } from './components/headline/headline';
import { AddProductDialogComponent } from './components/add-product-dialog/add-product-dialog';
import { GraphqlService } from './services/graphql.service';
import { catchError, of, tap } from 'rxjs';
import { Product } from './models/product';
import { ProgressSpinner } from 'primeng/progressspinner';
import { ErrorBannerComponent } from './components/error-banner/error-banner';
import { Button } from 'primeng/button';
import { DeleteProductDialogComponent } from './components/delete-product-dialog/delete-product-dialog';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  imports: [
    ToolbarComponent,
    TableComponent,
    FooterComponent,
    HeadlineComponent,
    AddProductDialogComponent,
    ProgressSpinner,
    ErrorBannerComponent,
    Button,
    DeleteProductDialogComponent,
    EditProductDialogComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly loading = signal(false);
  protected readonly error = signal(false);
  protected readonly showAddProductDialog = signal(false);
  protected readonly showEditProductDialog = signal(false);
  protected readonly showDeleteProductDialog = signal(false);
  protected readonly affectedProduct = signal<Product>({} as Product);
  protected readonly products = signal<Array<Product>>([]);
  private readonly graphqlService = inject(GraphqlService);

  public constructor() {
    this.loadProducts();
  }

  protected openAddProductDialog(): void {
    this.showAddProductDialog.set(true);
  }

  protected openEditProductDialog(product: Product): void {
    this.showEditProductDialog.set(true);
    this.affectedProduct.set(product);
  }

  protected confirmDeletion(product: Product): void {
    this.showDeleteProductDialog.set(true);
    this.affectedProduct.set(product);
  }

  protected loadProducts(): void {
    this.error.set(false);
    this.loading.set(true);

    this.graphqlService
      .getProducts()
      .pipe(
        tap(() => {
          this.loading.set(false);
        }),
        catchError((error) => {
          console.error('Error loading products:', error);

          this.error.set(true);

          return of({ data: { products: [] } });
        })
        )
      .subscribe({
        next: (response) => {
          if (!response?.data?.products) return;

          this.products.set(response.data.products);
        },
      });
  }
}
