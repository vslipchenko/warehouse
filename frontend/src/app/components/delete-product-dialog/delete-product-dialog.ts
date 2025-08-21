import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-product-dialog',
  imports: [Button, Dialog, FormsModule],
  templateUrl: './delete-product-dialog.html',
  styleUrl: './delete-product-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteProductDialogComponent {
  public readonly visible = input.required<WritableSignal<boolean>>();
  public readonly productName = input.required<string>();
  protected readonly loading = signal(false);

  get show(): boolean {
    return this.visible()();
  }

  set show(visible: boolean) {
    this.visible().set(visible);
  }

  protected deleteProduct(): void {
    this.loading.set(true);
  }
}
