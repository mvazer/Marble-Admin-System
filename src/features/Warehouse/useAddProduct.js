import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../services/apiProduct";
import toast from "react-hot-toast";

export function useAddProduct() {
  const queryClient = useQueryClient()
  const { mutateAsync: addProduct, isPending: isAddingProduct } = useMutation({
    mutationFn: (object) => createProduct(object),
    onSuccess: () => {
      toast.success("Məhsullar uğurla əlavə edildi");
      queryClient.invalidateQueries(['products'])
    },
    onError: (err) => {
      toast.error('Məhsullar əlavə olunarkən xəta baş verdi')
      console.error(err.message);
    },
  });

  return { addProduct, isAddingProduct };
}
