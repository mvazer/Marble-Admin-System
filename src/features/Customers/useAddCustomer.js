import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCustomer as addCustomerApi } from "../../services/apiCustomer";

export function useAddCustomer() {
  const queryClient = useQueryClient();
  const { mutate: addCustomer, isPending: isCustomerAdding } = useMutation({
    mutationFn: (object) => addCustomerApi(object),
    onSuccess: () => {
      toast.success("Müştəri uğurla əlavə edildi.");
      queryClient.invalidateQueries(["customers"]);
    },
    onError: () => {
      toast.error("Müştəri əlavə edilərkən xəta baş verdi.");
    },
  });

  return { addCustomer, isCustomerAdding };
}
