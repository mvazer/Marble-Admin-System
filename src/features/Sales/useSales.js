import { useQuery } from "@tanstack/react-query";
import { getSale, getSaleId } from "../../services/apiSale";
import { useParams } from "react-router-dom";

export function useSales() {
  const { data: sales, isPending: isSalesLoading } = useQuery({
    queryKey: [`sales`],
    queryFn: getSale,
  });

  return { sales, isSalesLoading };
}

export function useSalesId() {
  const { salesTotalId } = useParams();
  const { data: sales, isPending: isSalesLoading } = useQuery({
    queryKey: [`sale ${salesTotalId}`],
    queryFn: () => getSaleId("sale_id", salesTotalId),
  });

  return { sales, isSalesLoading };
}
