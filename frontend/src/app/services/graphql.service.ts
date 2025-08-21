import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

export interface CreateProductInput {
  name: string;
  quantity: number;
  unitPrice: number;
  description?: string | null;
}

export interface UpdateProductInput {
  name?: string;
  quantity?: number;
  unitPrice?: number;
  description?: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  /**
   * Get all products
   */
  getProducts(): Observable<{ data: { products: Product[] } }> {
    const GET_PRODUCTS = gql`
      query GetProducts {
        products {
          id
          name
          quantity
          unitPrice
          description
          createdAt
          updatedAt
        }
      }
    `;

    return this.apollo.watchQuery<{ products: Product[] }>({
      query: GET_PRODUCTS,
    }).valueChanges;
  }

  /**
   * Create a new product
   */
  createProduct(input: CreateProductInput): Observable<any> {
    const CREATE_PRODUCT = gql`
      mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
          id
          name
          quantity
          unitPrice
          description
          createdAt
          updatedAt
        }
      }
    `;

    return this.apollo.mutate({
      mutation: CREATE_PRODUCT,
      variables: { input },
      refetchQueries: ['GetProducts'],
    });
  }

  /**
   * Update an existing product
   */
  updateProduct(id: number, input: UpdateProductInput): Observable<any> {
    const UPDATE_PRODUCT = gql`
      mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
        updateProduct(id: $id, input: $input) {
          id
          name
          quantity
          unitPrice
          description
          createdAt
          updatedAt
        }
      }
    `;

    return this.apollo.mutate({
      mutation: UPDATE_PRODUCT,
      variables: { id, input },
      refetchQueries: ['GetProducts'],
    });
  }

  /**
   * Delete a product
   */
  deleteProduct(id: number): Observable<any> {
    const DELETE_PRODUCT = gql`
      mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id)
      }
    `;

    return this.apollo.mutate({
      mutation: DELETE_PRODUCT,
      variables: { id },
      refetchQueries: ['GetProducts'],
    });
  }
}
