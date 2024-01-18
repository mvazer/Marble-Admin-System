import { useQuery } from "@tanstack/react-query";
import {
  getSaleTotal,
  getSaleTotalCustomer,
  getSaleTotalId,
} from "../../services/apiSaleTotal";
import { useParams } from "react-router-dom";

export function useSalesTotal() {
  const { data: salesTotal, isPending: isSalesTotalLoading } = useQuery({
    queryKey: [`salesTotal`],
    queryFn: getSaleTotal,
  });

  return { salesTotal, isSalesTotalLoading };
}

export function useSalesTotalCustomer() {
  const { customerId } = useParams();
  const { data: salesTotalCustomer, isPending: isSalesTotalCustomerLoading } =
    useQuery({
      queryKey: [`salesTotalCustomer ${customerId}`],
      queryFn: () => getSaleTotalCustomer(customerId),
    });

  return { salesTotalCustomer, isSalesTotalCustomerLoading };
}

export function useSaleTotalId() {
  const { salesTotalId } = useParams();
  const { data: saleTotalId, isPending: isSalesTotalIdLoading } = useQuery({
    queryKey: [`salesTotalCustomer ${salesTotalId}`],
    queryFn: () => getSaleTotalId(salesTotalId),
  });

  return { saleTotalId, isSalesTotalIdLoading };
}
