import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { ErrorBannerComponent } from '../error-banner/error-banner';

@Component({
  selector: 'app-edit-product-dialog',
  imports: [Button, Dialog, ErrorBannerComponent],
  templateUrl: './edit-product-dialog.component.html',
  styleUrl: './edit-product-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductDialogComponent {
  public readonly visible = input.required<WritableSignal<boolean>>();
  protected readonly loading = signal(false);
  protected readonly error = signal(false);

  get show(): boolean {
    return this.visible()();
  }

  set show(visible: boolean) {
    this.visible().set(visible);
  }
}
