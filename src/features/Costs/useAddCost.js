import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCost as addCostApi } from "../../services/apiCosts";

export function useAddCost() {
  const queryClient = useQueryClient();
  const { mutate: addCost, isPending: isCostAdding } = useMutation({
    mutationFn: (object) => addCostApi(object),
    onSuccess: () => {
      toast.success("Xərc uğurla əlavə edildi.");
      queryClient.invalidateQueries(["costs"]);
    },
    onError: () => {
      toast.error("Xərc əlavə edilərkən xəta baş verdi.");
    },
  });

  return { addCost, isCostAdding };
}
