import { useQuery } from "@tanstack/react-query";
import { getHistoryApi } from "../../services/apiHistory";

export function useHistory() {
  const { data: history, isPending: isLoadingHistory } = useQuery({
    queryKey: ["history"],
    queryFn: getHistoryApi,
  });

  return { history, isLoadingHistory };
}
