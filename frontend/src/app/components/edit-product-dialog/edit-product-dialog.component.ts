import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ErrorBannerComponent } from '../error-banner/error-banner';
import { Product } from '../../models/product';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Textarea } from 'primeng/textarea';
import {
  DECIMAL_MAX_VALUE,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  UNSIGNED_INTEGER_MAX_VALUE,
} from '../../constants/product';
import {
  GraphqlService,
  UpdateProductInput,
} from '../../services/graphql.service';
import { untilDestroyed } from '../../utilities/operator';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-edit-product-dialog',
  imports: [
    Button,
    Dialog,
    ErrorBannerComponent,
    FormsModule,
    InputNumber,
    InputText,
    Message,
    Textarea,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductDialogComponent {
  public readonly visible = input.required<WritableSignal<boolean>>();
  public readonly product = input.required<Product>();
  protected readonly loading = signal(false);
  protected readonly error = signal(false);
  protected readonly nameMaxLength = PRODUCT_NAME_MAX_LENGTH;
  protected readonly descriptionMaxLength = PRODUCT_DESCRIPTION_MAX_LENGTH;
  protected readonly quantityMaxValue = UNSIGNED_INTEGER_MAX_VALUE;
  protected readonly unitPriceMaxValue = DECIMAL_MAX_VALUE;
  protected readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(PRODUCT_NAME_MAX_LENGTH),
    ]),
    quantity: new FormControl(0),
    unitPrice: new FormControl(0),
    description: new FormControl('', [
      Validators.maxLength(PRODUCT_DESCRIPTION_MAX_LENGTH),
    ]),
  });
  private readonly untilDestroyed = untilDestroyed();
  private readonly graphqlService = inject(GraphqlService);

  public constructor() {
    effect(() => {
      this.patchFormValues(this.product());
    });
  }

  get show(): boolean {
    return this.visible()();
  }

  set show(visible: boolean) {
    this.visible().set(visible);
  }

  protected saveChanges(): void {
    this.form.markAllAsDirty();

    if (this.form.invalid) return;

    this.form.disable();

    this.error.set(false);
    this.loading.set(true);

    const id = this.product().id;
    const updateProductInput: UpdateProductInput = {
      name: this.form.controls.name.value!,
      quantity: this.form.controls.quantity.value!,
      unitPrice: this.form.controls.unitPrice.value!,
      description: this.form.controls.description.value || null,
    };

    this.graphqlService
      .updateProduct(id, updateProductInput)
      .pipe(
        this.untilDestroyed(),
        catchError((error) => {
          console.error('Error editing product:', error);

          this.error.set(true);

          return of(null);
        }),
        finalize(() => {
          this.form.enable();

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

  private patchFormValues(product: Product): void {
    const formValues = {
      name: product.name,
      quantity: product.quantity,
      unitPrice: product.unitPrice,
      description: product.description,
    };

    this.form.patchValue(formValues);
  }
}
