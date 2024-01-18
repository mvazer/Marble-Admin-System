import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSale } from "../../services/apiSale";

export function useAddSale() {
  const queryClient = useQueryClient();
  const { mutateAsync: addSale, isPending: isAddingSale } = useMutation({
    mutationFn: (object, i) => createSale(object),
    onSuccess: () => {
      toast.success("Satışa məhsul uğurla əlavə edildi");
      queryClient.invalidateQueries(["sales"]);
    },
    onError: (err) => {
      toast.error("Satışa məhsul əlavə olunarkən xəta baş verdi");
      console.error(err.message);
    },
  });

  return { addSale, isAddingSale };
}
