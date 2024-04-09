import { useRef, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { createPortal } from "react-dom";
import { useUpdateSaleTotal } from "./useUpdateSaleTotal";
import { useUser } from "../Authentication/useUser";
import { useAddHistory } from "../History/useAddHistory";

function SaleEditForm({ setToggle, leftPayment, id, paid, isFinishedInitial }) {
  const [payment, setPayment] = useState(0);
  const [isFinished, setIsFinished] = useState(isFinishedInitial);
  const [error, setError] = useState("");
  const ModalRef = useRef();

  const { updateSaleTotal, isUpdatingSaleTotal } = useUpdateSaleTotal();
  const { addHistory, isAddingHistory } = useAddHistory();
  const { user, isUserLoading } = useUser();
  const isLoading = isUpdatingSaleTotal || isAddingHistory || isUserLoading;

  function submitHandler(e) {
    e.preventDefault();

    if (payment === "") {
      setError("Bu xana vacibdir");
      return;
    }
    if (payment < 0) {
      setError("Ödənilən məbləğ 0-dan kiçik ola bilməz");
      return;
    }
    if (payment > leftPayment) {
      setError("Ödənilən məbləğ qalıq borcdan böyük ola bilməz");
      return;
    }
    setError("");
    const updateSaleTotalData = {
      id,
      object: { paid: +paid + +payment, isFinished },
    };

    const historyData = {
      eventType: "saleTotal",
      eventID: id,
      eventAction: "editSale",
      eventDescription: {
        paid: payment,
        isFinished: isFinishedInitial !== isFinished,
      },
      userID: user.user.id,
      username: user.user.user_metadata["username"] || "",
      userEmail: user.user.email,
    };

    updateSaleTotal(updateSaleTotalData).then(() => addHistory(historyData));
    setPayment(0);
    setIsFinished(0);
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
              htmlFor="payment"
            >
              <span>Əlavə ödənilən məbləğ</span>
            </label>

            <input
              className="h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md "
              type="number"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              id="payment"
            />
            <span className=" flex justify-between text-sm font-normal">
              <span className="text-green-700">Qalıq borc:</span>
              <span
                onClick={() => setPayment(leftPayment)}
                className="cursor-pointer font-semibold"
              >
                {formatCurrency(leftPayment)}
              </span>
            </span>
            {error.length > 0 && (
              <span className="mr-auto text-sm font-normal text-red-700">
                {error}
              </span>
            )}
          </div>
          <div className={`flex w-fit min-w-[15%] flex-col gap-2 px-2`}>
            <label
              className="flex items-center justify-between gap-3 rounded-xl p-2 font-semibold transition-all hover:bg-slate-600/10"
              htmlFor="isFinished"
            >
              <span>Sifariş tamamlandı</span>
              <input
                disabled={isFinishedInitial}
                type="checkbox"
                checked={isFinished}
                value={isFinished}
                onChange={(e) => setIsFinished(e.target.checked)}
                id="isFinished"
              />
            </label>
            <button
              onClick={(e) => submitHandler(e)}
              disabled={isLoading}
              className="ml-auto w-fit rounded-full bg-green-300/70 px-4 py-2 text-center text-sm font-semibold transition-all duration-150 hover:bg-green-400"
            >
              {isLoading ? "Təsdiqlənir..." : "Təsdiqlə"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default SaleEditForm;
