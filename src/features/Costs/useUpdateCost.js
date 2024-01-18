import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCustomer as updateCustomerApi } from "../../services/apiCustomer";
import { updateCost as updateCostApi } from "../../services/apiCosts";

export function useUpdateCost() {
  const queryClient = useQueryClient();
  const { mutate: updateCost, isPending: isCostUpdating } = useMutation({
    mutationFn: (object) => updateCostApi(object),
    onSuccess: () => {
      toast.success("Xərc dəyişiklikləri uğurla yerinə yetirildi.");
      queryClient.invalidateQueries(["costs"]);
    },
    onError: () => {
      toast.error("Xərc dəyişiklikləri yerinə yetirilərkən xəta baş verdi.");
    },
  });

  return { updateCost, isCostUpdating };
}
