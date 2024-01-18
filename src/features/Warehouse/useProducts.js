import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProduct";

export function useProducts() {
  const { data: products, isPending: isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { products, isLoading };
}
