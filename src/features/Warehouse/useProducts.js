import { useQuery } from "@tanstack/react-query";
import { getLossProducts, getProducts } from "../../services/apiProduct";

export function useProducts() {
  const { data: products, isPending: isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { products, isLoading };
}


export function useLossProducts() {
  const { data: products, isPending: isLoading } = useQuery({
    queryKey: ["productsLoss"],
    queryFn: getLossProducts,
  });

  return { products, isLoading };
}
