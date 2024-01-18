import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateProduct as updateProductApi } from "../../services/apiProduct";

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutateAsync: updateProduct, isPending: isUpdatingProduct } =
    useMutation({
      mutationFn: (object) => updateProductApi(object),
      onSuccess: () => {
        toast.success("Məhsullar uğurla anbardan çıxıldı");
        queryClient.invalidateQueries(["products"]);
      },
      onError: (err) => {
        toast.error("Məhsullar anbardan çıxarılarkən xəta baş verdi");
        console.error(err.message);
      },
    });

  return { updateProduct, isUpdatingProduct };
}
