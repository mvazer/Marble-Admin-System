import { useQuery } from "@tanstack/react-query";
import { getOptions } from "../../services/apiOption";

export function useOptions(id='') {
  const { data: options, isPending: isOptionsLoading } = useQuery({
    queryKey: [`options${id}`],
    queryFn: getOptions,
  });
  return { options, isOptionsLoading };
}
