import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createOption } from "../../services/apiOption";

export function useAddOption() {
  const queryClient = useQueryClient();
  const { mutate: addOption, isPending: isOptionAdding } = useMutation({
    mutationFn: (object) => createOption(object),
    onSuccess: () => {
      toast.success("Yeni seçim uğurla əlavə edildi");
      queryClient.invalidateQueries(["options"]);
    },
    onError: (err) => {
      toast.error("Yeni seçim əlavə olunarkən xəta baş verdi");
      console.error(err.message);
    },
  });

  return { addOption, isOptionAdding };
}
