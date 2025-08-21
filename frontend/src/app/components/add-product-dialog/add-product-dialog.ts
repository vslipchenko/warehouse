import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DECIMAL_MAX_VALUE,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  UNSIGNED_INTEGER_MAX_VALUE,
} from '../../constants/product';
import { Message } from 'primeng/message';
import {
  CreateProductInput,
  GraphqlService,
} from '../../services/graphql.service';
import { catchError, finalize, of } from 'rxjs';
import { untilDestroyed } from '../../utilities/operator';
import { ErrorBannerComponent } from '../error-banner/error-banner';

@Component({
  selector: 'app-add-product-dialog',
  imports: [
    Dialog,
    Button,
    InputText,
    Textarea,
    InputNumber,
    ReactiveFormsModule,
    Message,
    ErrorBannerComponent,
  ],
  templateUrl: './add-product-dialog.html',
  styleUrl: './add-product-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductDialogComponent {
  public readonly visible = input.required<WritableSignal<boolean>>();
  protected readonly loading = signal(false);
  protected readonly error = signal(false);
  protected readonly nameMaxLength = PRODUCT_NAME_MAX_LENGTH;
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

  get show(): boolean {
    return this.visible()();
  }

  set show(visible: boolean) {
    this.visible().set(visible);
  }

  protected addProduct(): void {
    this.form.markAllAsDirty();

    if (this.form.invalid) return;

    this.error.set(false);
    this.loading.set(true);

    const productInput: CreateProductInput = {
      name: this.form.controls.name.value!,
      quantity: this.form.controls.quantity.value!,
      unitPrice: this.form.controls.unitPrice.value!,
      description: this.form.controls.description.value || null,
    };

    this.graphqlService
      .createProduct(productInput)
      .pipe(
        this.untilDestroyed(),
        catchError((error) => {
          console.error('Error creating product:', error);

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
