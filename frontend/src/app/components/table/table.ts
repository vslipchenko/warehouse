import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TableModule } from 'primeng/table';
import { Product } from '../../models/product';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-table',
  imports: [TableModule, Button, Tooltip],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  public readonly products = input.required<Array<Product>>();
  public readonly editProduct = output<Product>();
  public readonly deleteProduct = output<Product>();
}
