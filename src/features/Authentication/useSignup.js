import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiUser";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const QueryClient = useQueryClient();
  const { mutate: signup, isPending: isSigningup } = useMutation({
    mutationFn: (obj) => signupApi(obj),
    onSuccess: () => {
      toast.success("Yeni hesab uğurla yaradıldı.");
      QueryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        "Yeni hesab yaradılarkən xəta baş verdi. \nXəta mesajı: " + error,
      );
    },
    onSettled: () => {
      QueryClient.clear()
      navigate('/login')
    },
  });
  return { signup, isSigningup };
}