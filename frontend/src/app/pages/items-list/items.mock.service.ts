import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WarehouseProduct } from '../../models/warehouseProduct';
import { GraphqlService } from '../../services/graphql.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsMockService {
  constructor(private graphqlService: GraphqlService) {}

  get items(): Observable<WarehouseProduct[]> {
    return this.graphqlService
      .getProducts()
      .pipe(map((result) => result.data.products));
  }

  addToShipment(id: number): void {
    // TODO: Implement shipment logic
    console.log(`Adding item ${id} to shipment`);
  }

  createItem(item: Omit<WarehouseProduct, 'id' | 'createdAt' | 'updatedAt'>): Observable<any> {
    return this.graphqlService.createProduct(item);
  }

  updateItem(id: number, item: Partial<WarehouseProduct>): Observable<any> {
    return this.graphqlService.updateProduct(id, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.graphqlService.deleteProduct(id);
  }
}
