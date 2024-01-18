import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateUser as updateUserApi } from "../../services/apiUser";

export function useUpdateUser() {
  const navigate = useNavigate();
  const QueryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: (obj) => updateUserApi(obj),
    onSuccess: () => {
      toast.success("Hesab dəyişiklikəri uğurla edildi.");
      QueryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error(
        "Hesab dəyişiklikəri edilərkən xəta baş verdi. \nXəta mesajı: " + error,
      );
    },
    // onSettled: () => {
    //   QueryClient.clear();
    //   navigate("/login");
    // },
  });
  return { updateUser, isUpdatingUser };
}
