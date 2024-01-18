import { useRef } from "react";
import { createPortal } from "react-dom";
import { useSalesTotal } from "../Sales/useSalesTotal";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import { useDeleteCustomer } from "./useDeleteCustomer";
import SpinnerMini from "../../ui/SpinnerMini";

function CustomerDeleteForm({ setToggle, customerId }) {
  const ModalRef = useRef();
  const { salesTotal, isSalesTotalLoading } = useSalesTotal();
  const { deleteCustomer, isCustomerDeleting } = useDeleteCustomer();

  function deleteHandler() {
    const hasSale = salesTotal.saleTotal.some(
      (total) => total.customer_id === customerId,
    );
    if (hasSale) {
      toast.error("Müştəri adına satış mövcuddur.");
      setToggle("");
      return
    }
    deleteCustomer(customerId);
  }

  return createPortal(
    <div
      ref={ModalRef}
      onMouseDown={(e) => e.target == ModalRef.current && setToggle("")}
      className="fixed left-0 top-0 z-10 h-[100vh] w-full backdrop-blur-sm transition-all duration-200"
    >
      <div className="fixed left-[50%] top-[50%] block h-[37%] w-[37%] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-3xl bg-slate-50/95 px-16 pb-10 pt-14 shadow-2xl transition-all duration-200">
        <button
          onClick={() => setToggle("")}
          className="absolute right-3 top-2 p-2 text-2xl"
        >
          &#10005;
        </button>
        {isSalesTotalLoading ? (
          <Spinner />
        ) : (
          <div className="flex flex-col">
            <span className="text-lg font-semibold">
              Müştərini silmək istədiyinizə əminsiz?
            </span>
            <span className="mt-8 text-end text-sm font-light">
              Qeyd: Müştəri adına satış yoxdursa, silinə bilər
            </span>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setToggle("")}
                className="rounded-xl bg-slate-700/90 px-4 py-1 font-semibold text-slate-100 hover:bg-slate-800 disabled:bg-slate-800/70"
              >
                Ləğv et
              </button>
              {isCustomerDeleting ? (
                <SpinnerMini />
              ) : (
                <button
                  onClick={deleteHandler}
                  className="rounded-xl bg-red-700/90 px-6 py-1 font-semibold text-slate-100 hover:bg-red-800 disabled:bg-red-700/70"
                >
                  Sil
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default CustomerDeleteForm;
