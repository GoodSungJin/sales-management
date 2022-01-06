export interface DailySales {
  userName: string;
  date: string;
  store: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}
