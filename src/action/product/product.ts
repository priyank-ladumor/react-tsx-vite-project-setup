import { Api } from "src/utils/axios";
import { createQueryKeys } from "@lukemorales/query-key-factory";
import { Product, ProductResponse } from "src/action/product/types";

class Products extends Api {
  constructor() {
    super("products"); // Pass baseUrl to the parent constructor
  }

  getAll(): Promise<ProductResponse> {
    return this._all<ProductResponse>();
  }

  get(id: string): Promise<Product> {
    return this._get<Product>(id);
  }

  delete(id: string): Promise<void> {
    return this._delete<void>(id);
  }

  update(id: string, updatedProduct: Product): Promise<Product> {
    return this._update<Product>(id, updatedProduct);
  }
}

export const productsApi = new Products();

export const productQuery = createQueryKeys("products", {
  all: () => ({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const { products } = await productsApi.getAll();
      return products;
    },
  }),
  get: (id: string) => ({
    queryKey: ["product", id],
    queryFn: async () => {
      const product = await productsApi.get(id);
      return product;
    },
  }),
});
