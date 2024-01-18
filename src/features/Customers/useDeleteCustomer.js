import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCustomer as deleteCustomerApi } from "../../services/apiCustomer";

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  const { mutate: deleteCustomer, isPending: isCustomerDeleting } = useMutation(
    {
      mutationFn: (id) => deleteCustomerApi(id),
      onSuccess: () => {
        toast.success("Müştəri uğurla silindi.");
        queryClient.invalidateQueries(["customers"]);
      },
      onError: () => {
        toast.error("Müştəri silinərkən xəta baş verdi.");
      },
    },
  );

  return { deleteCustomer, isCustomerDeleting };
}
