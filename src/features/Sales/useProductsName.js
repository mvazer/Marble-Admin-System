import { useQuery } from "@tanstack/react-query";
import { getFilteredProducts } from "../../services/apiProduct";

export function useProductsName({ value, id = "" }) {
  const {
    data: products,
    refetch,
    isPending: isLoading,
  } = useQuery({
    queryKey: [`productsName${id}`],
    queryFn: () => getFilteredProducts({ key: "name", value }),
  });

  return { products, isLoading, refetch };
}

export function useProductContainer(value) {
  const {
    data: products,
    refetch,
    isPending: isLoading,
  } = useQuery({
    queryKey: [`productsContainer${value}`],
    queryFn: () => getFilteredProducts({ key: "container_id", value }),
  });

  return { products, isLoading, refetch };
}
