import { useQuery } from "@tanstack/react-query";
import { getCash } from "../../services/apiCash";

export function useCash() {
  const { data: cash, isPending: isLoadingCash } = useQuery({
    queryKey: ["cash"],
    queryFn: getCash,
  });

  return { cash, isLoadingCash };
}

