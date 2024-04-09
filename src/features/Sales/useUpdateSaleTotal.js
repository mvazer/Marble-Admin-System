import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSaleTotal as updateSaleTotalApi } from "../../services/apiSaleTotal";
import toast from "react-hot-toast";

export function useUpdateSaleTotal() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateSaleTotal, isPending: isUpdatingSaleTotal } =
    useMutation({
      mutationFn: ({ id, object }) => {updateSaleTotalApi(id, object)},
      onSuccess: () => {
        toast.success("Satış uğurla təzələndi");
        queryClient.invalidateQueries({active:true});
      },
      onError: (err) => {
        toast.error("Satış təzələnərkən xəta baş verdi");
        console.error(err.message);
      },
    });
  return { updateSaleTotal, isUpdatingSaleTotal };
}
