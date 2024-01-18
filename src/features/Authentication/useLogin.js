import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const QueryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoggingin } = useMutation({
    mutationFn: (obj) => loginApi(obj),
    onSuccess: () => {
      toast.success("Hesaba uğurla daxil oldunuz.");
      navigate("/dashboard");
      QueryClient.invalidateQueries(["user"]);
    },
    onError: () => {
      toast.error("Hesaba daxil olarkən xəta baş verdi.");
    },
    onSettled: () => {
      QueryClient.clear();
    },
  });
  return { login, isLoggingin };
}
