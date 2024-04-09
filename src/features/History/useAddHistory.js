import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addHistoryApi } from "../../services/apiHistory";

export function useAddHistory() {
  const queryClient = useQueryClient();
  const { mutateAsync: addHistory, isPending: isAddingHistory } = useMutation({
    mutationFn: (object) => addHistoryApi(object),
    onSuccess: () => {
      // toast.success("Satışa məhsul uğurla əlavə edildi");
      queryClient.invalidateQueries(["history"]);
    },
    onError: (err) => {
      toast.error("Tarixçəyə hadisə əlavə olunarkən xəta baş verdi");
      console.error(err.message);
    },
  });

  return { addHistory, isAddingHistory };
}
