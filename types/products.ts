export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  frequency: string;
  category: string;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  frequency: string;
  category: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
} 