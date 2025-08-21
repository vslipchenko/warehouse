import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Product } from '../../models/product';

@Component({
  selector: 'app-table',
  imports: [TableModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  public readonly products = input.required<Array<Product>>();
}
