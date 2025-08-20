import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar';
import { TableComponent } from './components/table/table';
import { FooterComponent } from './components/footer/footer';
import { HeadlineComponent } from './components/headline/headline';
import { AddProductDialogComponent } from './components/add-product-dialog/add-product-dialog';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly showAddProductDialog = signal(false);

  protected openAddProductDialog(): void {
    this.showAddProductDialog.set(true);
  }
}
