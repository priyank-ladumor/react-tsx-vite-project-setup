import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useProductMutations } from "src/action/product/ProductMutation";
import { productQuery } from "src/action/product/product";
import useControlledLocalStorage from "src/utils/localstorage";

interface Product {
    id: string;
    images?: string[];
    name: string;
    title: string;
    sku: string;
    price: string;
}

function Home() {
    const { deleteProductMutation } = useProductMutations();
    const [productDatas, setProductDatas] = useState<Product[]>([]);
    const [count, setCount] = useControlledLocalStorage<number>("count", 0);
    const { data, error, isLoading } = useQuery({
        ...productQuery.all(),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (data && data.length > 0) {
                    setProductDatas(data as Product[] | unknown as never);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [data]);

    const handleRemove = async (id: string) => {
        try {
            await deleteProductMutation.mutate(id);
        } catch (error) {
            console.error(error);
        }
    };

    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            {isLoading ? (
                <div style={{ border: "1px solid yellow", margin: "15px" }}>
                    Loading...
                </div>
            ) : (
                <div className="card">
                    <h1>Products</h1>
                    <center>
                        <h1>{count}</h1>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{ cursor: "pointer" }}
                                onClick={() => setCount(count + 1)}
                            >
                                <h1>+</h1>
                            </div>
                            <div
                                style={{
                                    marginLeft: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => setCount(count - 1)}
                            >
                                <h1>-</h1>
                            </div>
                        </div>
                    </center>

                    {productDatas.length > 0 &&
                        productDatas.slice(0, 3).map((product) => (
                            <div
                                key={product.id}
                                style={{
                                    border: "1px solid black",
                                    margin: "15px",
                                    width: "300px",
                                }}
                            >
                                <img
                                    src={product.images?.[0]}
                                    width={120}
                                    height={120}
                                    alt={product.name}
                                />
                                <h3>{product.title}</h3>
                                <h3>{product.sku}</h3>
                                <p>{product.price}</p>
                                <p
                                    style={{ color: "red", cursor: "pointer" }}
                                    onClick={() => handleRemove(product.id)}
                                >
                                    remove
                                </p>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
}

export default Home;
