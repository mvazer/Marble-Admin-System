import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSaleTotal as deleteSaleTotalApi } from "../../services/apiSaleTotal";

export function useDeleteSaleTotal() {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteSaleTotal, isPending: isDeletingSaleTotal } =
    useMutation({
      mutationFn: (id) => deleteSaleTotalApi(id),
      onSuccess: () => {
        toast.success("Ümumi satış uğurla anbardan silindi");
        queryClient.invalidateQueries({ active: true });
      },
      onError: (err) => {
        toast.error("Ümumi satış silinərkən xəta baş verdi");
        console.error(err.message);
      },
    });

  return { deleteSaleTotal, isDeletingSaleTotal };
}
