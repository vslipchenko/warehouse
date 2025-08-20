import {
  ChangeDetectionStrategy,
  Component,
  input,
  WritableSignal,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-add-product-dialog',
  imports: [Dialog, Button],
  templateUrl: './add-product-dialog.html',
  styleUrl: './add-product-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductDialogComponent {
  public readonly visible = input.required<WritableSignal<boolean>>();

  get show(): boolean {
    return this.visible()();
  }

  set show(visible: boolean) {
    this.visible().set(visible);
  }
}
