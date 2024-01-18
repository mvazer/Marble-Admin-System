import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCustomer as updateCustomerApi } from "../../services/apiCustomer";

export function useUpdateCustomer() {
  const queryClient = useQueryClient();
  const { mutate: updateCustomer, isPending: isCustomerUpdating } = useMutation(
    {
      mutationFn: (object) => updateCustomerApi(object),
      onSuccess: () => {
        toast.success("Müştəri dəyişiklikləri uğurla yerinə yetirildi.");
        queryClient.invalidateQueries(["customers"]);
      },
      onError: () => {
        toast.error(
          "Müştəri dəyişiklikləri yerinə yetirilərkən xəta baş verdi.",
        );
      },
    },
  );

  return { updateCustomer, isCustomerUpdating };
}
