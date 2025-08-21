import {
  ChangeDetectionStrategy,
  Component,
  input,
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
  ],
  templateUrl: './add-product-dialog.html',
  styleUrl: './add-product-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductDialogComponent {
  public readonly visible = input.required<WritableSignal<boolean>>();
  protected disableAddButton = false;
  protected addButtonLabel = 'Add';
  protected nameMaxLength = PRODUCT_NAME_MAX_LENGTH;
  protected quantityMaxValue = UNSIGNED_INTEGER_MAX_VALUE;
  protected unitPriceMaxValue = DECIMAL_MAX_VALUE;
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

  get show(): boolean {
    return this.visible()();
  }

  set show(visible: boolean) {
    this.visible().set(visible);
  }

  protected addProduct(): void {
    this.form.markAllAsDirty();

    if (this.form.invalid) return;

    this.disableAddButton = true;
    this.addButtonLabel = 'Adding...';
  }
}
