import { useQuery } from "@tanstack/react-query";
import { getCustomer, getCustomers } from "../../services/apiCustomer";
import { useParams } from "react-router-dom";
import { useSaleTotalId } from "../Sales/useSalesTotal";

export function useCustomer() {
  const { data: customers, isPending: isLoadingCustomers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  return { customers, isLoadingCustomers };
}

export function useCustomerById() {
  const { customerId } = useParams();

  const { data: customer, isPending: isLoadingCustomer } = useQuery({
    queryKey: [`customer ${customerId}`],
    queryFn: () => getCustomer("id", customerId),
  });

  return { customer, isLoadingCustomer };
}