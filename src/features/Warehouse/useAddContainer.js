import { useMutation } from "@tanstack/react-query";
import { createContainer } from "../../services/apiContainer";
import toast from "react-hot-toast";

export function useAddContainer() {
  const { mutateAsync: addContainer, isPending: isAddingContainer } = useMutation({
    mutationFn: (object) => createContainer(object),
    onSuccess: () => {
      console.log("Container success");
    },
    onError: (err) => {
      toast.error('Konteyner əlavə olunarkən xəta baş verdi')
      console.error(err.message);
    },
  });

  return { addContainer, isAddingContainer };
}
