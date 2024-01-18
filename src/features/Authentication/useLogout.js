import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLoggingout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Hesabdan uğurla çıxış etdiniz.");
      navigate("/login");
      QueryClient.invalidateQueries(["user"]).then(() => QueryClient.clear());
    },
    onError: () => {
      toast.error("Hesabdan çıxış edərkən xəta baş verdi.");
    },
  });
  return { logout, isLoggingout };
}
