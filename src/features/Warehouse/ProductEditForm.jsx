import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Spinner from "../../ui/Spinner";
import { formatSquareMeters } from "../../utils/helpers";
import { useUpdateProduct } from "./useUpdateProduct";
import { useAddHistory } from "../History/useAddHistory";
import { useUser } from "../Authentication/useUser";

function ProductEditForm({
  setToggle,
  id,
  leftQuantity,
  paletteNumber,
  cost,
  container_id,
}) {
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  const ModalRef = useRef();

  const { updateProduct, isUpdatingProduct } = useUpdateProduct();
  const { addHistory, isAddingHistory } = useAddHistory();
  const { user, isUserLoading } = useUser();
  const isUpdating = isAddingHistory || isUpdatingProduct || isUserLoading;

  function submitHandler(e) {
    e.preventDefault();

    if (quantity === "") {
      setError("Bu xana vacibdir");
      return;
    }
    if (quantity < 0) {
      setError("Azalan miqdar 0-dan kiçik ola bilməz");
      return;
    }
    if (quantity > leftQuantity) {
      setError("Palet miqdarından artıq itki ola bilməz.");
      return;
    }

    setError("");
    const updateData = {
      id,
      object: { quantity: +leftQuantity - +quantity, loss: +quantity },
    };

    const historyData = {
      eventType: "container",
      eventID: id,
      eventAction: "editContainer",
      eventDescription: { loss: quantity },
      userID: user.user.id,
      username: user.user.user_metadata["username"] || "",
      userEmail: user.user.email,
    };

    updateProduct(updateData).then(() => addHistory(historyData));
    setQuantity(0);
    setToggle("");
  }
  return createPortal(
    <div
      ref={ModalRef}
      onMouseDown={(e) => e.target == ModalRef.current && setToggle("")}
      className="fixed left-0 top-0 z-10 h-[100vh] w-full backdrop-blur-sm transition-all duration-200"
    >
      <div className="fixed left-[50%] top-[50%] block h-fit w-fit translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-3xl bg-slate-50/95 p-16 shadow-2xl transition-all duration-200">
        <button
          onClick={() => setToggle("")}
          className="absolute right-3 top-2 p-2 text-2xl"
        >
          &#10005;
        </button>
        <div className="flex gap-10">
          <div className={`flex w-fit min-w-[15%] flex-col gap-2 px-2`}>
            <label
              className="flex items-center justify-between font-semibold"
              htmlFor="quantity"
            >
              <span>Qırılmış/itkiyə getmiş məhsul miqdarı</span>
            </label>

            <input
              className="h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md "
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              id="quantity"
            />
            <span className=" flex justify-between text-sm font-normal">
              <span>Qalıq miqdar:</span>
              <span
                onClick={() => setQuantity(leftQuantity)}
                className="cursor-pointer font-semibold"
              >
                {formatSquareMeters(leftQuantity)}
              </span>
            </span>
            {error.length > 0 && (
              <span className="mr-auto text-sm font-normal text-red-700">
                {error}
              </span>
            )}
          </div>
          <button
            onClick={(e) => submitHandler(e)}
            disabled={isUpdating}
            className="ml-auto h-fit w-fit self-end rounded-full bg-green-300/70 px-4 py-2 text-center text-sm font-semibold transition-all duration-150 hover:bg-green-400"
          >
            {isUpdating ? "Təsdiqlənir..." : "Təsdiqlə"}
            {/* Təsdiqlə */}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ProductEditForm;
