import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCash as addCashApi } from "../../services/apiCash";

export function useAddCash() {
  const queryClient = useQueryClient();
  const { mutateAsync: addCash, isPending: isCashAdding } = useMutation({
    mutationFn: (object) => addCashApi(object),
    onSuccess: () => {
      toast.success("Büdcə uğurla əlavə edildi.");
      queryClient.invalidateQueries(["cash"]);
    },
    onError: () => {
      toast.error("Büdcə əlavə edilərkən xəta baş verdi.");
    },
  });

  return { addCash, isCashAdding };
}
