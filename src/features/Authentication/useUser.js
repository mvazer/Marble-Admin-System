import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiUser";

export function useUser() {
  const { data: user, isPending: isUserLoading } = useQuery({
    queryKey: [`user`],
    queryFn: getUser,
  });

  return { user, isUserLoading };
}
