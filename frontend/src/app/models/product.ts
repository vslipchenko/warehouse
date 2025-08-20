export interface Product {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  description?: string;
  // imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
