import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteSale as deleteSaleApi } from "../../services/apiSale";

export function useDeleteSale() {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteSale, isPending: isDeletingSale } = useMutation({
    mutationFn: (id) => deleteSaleApi(id),
    onSuccess: () => {
      toast.success("Satış uğurla anbardan silindi");
      queryClient.invalidateQueries({active: true});
    },
    onError: (err) => {
      toast.error("Satış silinərkən xəta baş verdi");
      console.error(err.message);
    },
  });

  return { deleteSale, isDeletingSale };
}
