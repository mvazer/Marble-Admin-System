import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createSaleTotal } from "../../services/apiSaleTotal";

export function useAddSaleTotal() {
  const queryClient = useQueryClient();
  const { mutateAsync: addSaleTotal, isPending: isAddingSaleTotal } = useMutation({
    mutationFn: (object) => createSaleTotal(object),
    onSuccess: () => {
      toast.success("Satış uğurla əlavə edildi");
      queryClient.invalidateQueries(["sales"]);
    },
    onError: (err) => {
      toast.error("Satış əlavə olunarkən xəta baş verdi");
      console.error(err.message);
    },
  });

  return { addSaleTotal, isAddingSaleTotal };
}
