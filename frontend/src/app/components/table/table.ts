import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {Table, TableModule} from 'primeng/table';
import {Product} from '../../models/product';
import {Button} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {FilterMetadata} from 'primeng/api';
import {CurrencyPipe, DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [
    TableModule,
    Button,
    Tooltip,
    IconField,
    InputIcon,
    InputText,
    CurrencyPipe,
    DecimalPipe,
  ],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  public readonly products = input.required<Array<Product>>();
  public readonly editProduct = output<Product>();
  public readonly deleteProduct = output<Product>();

  protected tableGlobalValue(table: Table<Product>): unknown {
    return (table.filters['global'] as FilterMetadata)?.value ?? null;
  }

  protected filterProducts(table: Table<Product>, event: Event): void {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  protected get columns(): Array<{field: string; header: string}> {
    return [
      {field: 'name', header: 'Name'},
      {field: 'quantity', header: 'Quantity'},
      {field: 'unitPrice', header: 'Unit Price'},
      {field: 'description', header: 'Description'},
    ];
  }
}
