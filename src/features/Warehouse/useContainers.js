import { useQuery } from "@tanstack/react-query";
import { getContainers as getContainersApi } from "../../services/apiContainer";

export function useContainers() {
  const { data: containers, isPending: isContainersLoading } = useQuery({
    queryKey: [`container`],
    queryFn: getContainersApi,
  });

  return { containers, isContainersLoading };
}
