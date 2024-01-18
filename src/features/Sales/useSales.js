import { useQuery } from "@tanstack/react-query";
import { getSale } from "../../services/apiSale";

export function useSales() {
  const { data: sales, isPending: isSalesLoading } = useQuery({
    queryKey: [`sales`],
    queryFn: getSale,
  });

  return { sales, isSalesLoading };
}
