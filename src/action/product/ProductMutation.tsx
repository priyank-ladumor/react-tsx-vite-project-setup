import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "src/action/product/types";
import { productsApi } from "src/action/product/product";

export const useProductMutations = () => {
    const queryClient = useQueryClient();

    // Update product mutation
    const updateProductMutation = useMutation<void, unknown, Product>({
        mutationFn: async (updatedProduct) => {
            await productsApi.update(updatedProduct.id, updatedProduct);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["allProducts"] as unknown as never); // Invalidate the query on success
        },
        onError: (error) => {
            console.error("Update product mutation failed", error);
        },
    });

    // Delete product mutation
    const deleteProductMutation = useMutation<void, unknown, string>({
        mutationFn: async (id) => {
            await productsApi.delete(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["allProducts"] as unknown as never, { exact: true } as unknown as never); // Invalidate the query on success
        },
        onError: (error) => {
            console.error("Delete product mutation failed", error);
        },
    });

    return {
        updateProductMutation,
        deleteProductMutation,
    };
};
