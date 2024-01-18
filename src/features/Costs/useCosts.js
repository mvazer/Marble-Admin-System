import { useQuery } from "@tanstack/react-query";
import { getCosts } from "../../services/apiCosts";

export function useCosts() {
  const { data: costs, isPending: isLoadingCosts } = useQuery({
    queryKey: ["costs"],
    queryFn: getCosts,
  });

  return { costs, isLoadingCosts };
}
