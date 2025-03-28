export type CartItem = {
  id: string;
  name: string;
  price: number;
  frequency: string;
  quantity: number;
}

export type Cart = {
  items: CartItem[];
  total: number;
} 