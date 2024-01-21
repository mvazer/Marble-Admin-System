import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProducts as deleteProductsApi } from "../../services/apiProduct";

export function useDeleteProducts() {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteProducts, isPending: isDeletingProducts } =
    useMutation({
      mutationFn: (id) => deleteProductsApi(id),
      onSuccess: () => {
        toast.success("konteyner uğurla anbardan silindi");
        queryClient.invalidateQueries({ active: true });
      },
      onError: (err) => {
        toast.error("Konteyner silinərkən xəta baş verdi");
        console.error(err.message);
      },
    });

  return { deleteProducts, isDeletingProducts };
}
