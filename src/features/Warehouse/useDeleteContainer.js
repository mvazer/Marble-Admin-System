import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteContainer as deleteContainerApi } from "../../services/apiContainer";

export function useDeleteContainer() {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteContainer, isPending: isDeletingContainer } =
    useMutation({
      mutationFn: (id) => deleteContainerApi(id),
      onSuccess: () => {
        toast.success("konteyner uğurla anbardan silindi");
        queryClient.invalidateQueries({ active: true });
      },
      onError: (err) => {
        toast.error("Konteyner silinərkən xəta baş verdi");
        console.error(err.message);
      },
    });

  return { deleteContainer, isDeletingContainer };
}
