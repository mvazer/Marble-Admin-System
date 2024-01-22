import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCost as deleteCostApi } from "../../services/apiCosts";

export function useDeleteCost() {
  const queryClient = useQueryClient();
  const { mutate: deleteCost, isPending: isCostDeleting } = useMutation({
    mutationFn: (id) => deleteCostApi(id),
    onSuccess: () => {
      toast.success("Xərc uğurla silindi.");
      queryClient.invalidateQueries(["costs"]);
    },
    onError: () => {
      toast.error("Xərc silinərkən xəta baş verdi.");
    },
  });

  return { deleteCost, isCostDeleting };
}
