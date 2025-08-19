import {Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {WarehouseProduct} from "../../../models/warehouseProduct";

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent {
  @Input() item: WarehouseProduct
  @Output() addToShipment: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }
}
