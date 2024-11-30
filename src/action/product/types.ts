export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
  }
  
  export interface ProductResponse {
    products: Product[];
  }
  