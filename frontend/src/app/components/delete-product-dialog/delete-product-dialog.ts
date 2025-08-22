import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { GraphqlService } from '../../services/graphql.service';
import { untilDestroyed } from '../../utilities/operator';
import { catchError, finalize, of } from 'rxjs';
import { Product } from '../../models/product';
import { ErrorBannerComponent } from '../error-banner/error-banner';

@Component({
  selector: 'app-delete-product-dialog',
  imports: [Button, Dialog, FormsModule, ErrorBannerComponent],
  templateUrl: './delete-product-dialog.html',
  styleUrl: './delete-product-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteProductDialogComponent {
  public readonly visible = input.required<WritableSignal<boolean>>();
  public readonly product = input.required<Product>();
  protected readonly loading = signal(false);
  protected readonly error = signal(false);
  private readonly untilDestroyed = untilDestroyed();
  private readonly graphqlService = inject(GraphqlService);

  protected get show(): boolean {
    return this.visible()();
  }

  protected set show(visible: boolean) {
    this.visible().set(visible);
  }

  protected deleteProduct(productId: number): void {
    this.error.set(false);
    this.loading.set(true);

    this.graphqlService
      .deleteProduct(productId)
      .pipe(
        this.untilDestroyed(),
        catchError((error) => {
          console.error('Error deleting product:', error);

          this.error.set(true);

          return of(null);
        }),
        finalize(() => {
          this.loading.set(false);
        })
        )
      .subscribe({
        next: (response) => {
          if (!response) return;

          this.show = false;
        },
      });
  }
}
