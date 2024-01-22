import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCash as deleteCashApi } from "../../services/apiCash";

export function useDeleteCash() {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteCash, isPending: isCashDeleting } = useMutation({
    mutationFn: (id) => deleteCashApi(id),
    onSuccess: () => {
      toast.success("Büdcə uğurla silindi.");
      queryClient.invalidateQueries(["cash"]);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Büdcə silinərkən xəta baş verdi.");
    },
  });

  return { deleteCash, isCashDeleting };
}
