import { useRef } from "react";
import { createPortal } from "react-dom";
import { useUpdateProduct } from "../Warehouse/useUpdateProduct";
import { useDeleteSale } from "./useDeleteSale";
import { useDeleteSaleTotal } from "./useDeleteSaleTotal";
import { useUser } from "../Authentication/useUser";
import { useAddHistory } from "../History/useAddHistory";

function SaleDeleteForm({ setToggle, id, filteredSales, products }) {
  const ModalRef = useRef();
  const { updateProduct, isUpdatingProduct } = useUpdateProduct();
  const { deleteSale, isDeletingSale } = useDeleteSale();
  const { deleteSaleTotal, isDeletingSaleTotal } = useDeleteSaleTotal();
  const { addHistory, isAddingHistory } = useAddHistory();
  const { user, isUserLoading } = useUser();

  const isLoading =
    isUpdatingProduct ||
    isDeletingSale ||
    isDeletingSaleTotal ||
    isAddingHistory ||
    isUserLoading;

  function deleteHandler() {
    if (isLoading) return;
    const updatePromises = filteredSales.map((sale) => {
      const { quantity: productQuantity, product_id } = sale;

      const quantity =
        products.find((product) => product.id === product_id).quantity +
        productQuantity;

      const historyData = {
        eventType: "saleTotal",
        eventID: id,
        eventAction: "deleteSale",
        userID: user.user.id,
        username: user.user.user_metadata["username"] || "",
        userEmail: user.user.email,
      };

      return updateProduct({ object: { quantity }, id: product_id })
        .then(() => deleteSale(sale.id))
        .then(() => addHistory(historyData));
    });
    Promise.all(updatePromises)
      .then(() => deleteSaleTotal(id))
      .then(() => setToggle(""));
  }

  return createPortal(
    <div
      ref={ModalRef}
      onMouseDown={(e) => e.target == ModalRef.current && setToggle("")}
      className="fixed left-0 top-0 z-10 h-[100vh] w-full backdrop-blur-sm transition-all duration-200"
    >
      <div className="fixed left-[50%] top-[50%] block h-fit w-fit translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-3xl bg-slate-50/95 px-16 pb-10 pt-14 shadow-2xl transition-all duration-200">
        <button
          onClick={() => setToggle("")}
          className="absolute right-3 top-2 p-2 text-2xl"
        >
          &#10005;
        </button>
        <div className="flex flex-col gap-14">
          <span className="text-lg font-semibold">
            Satışı silmək istədiyinizə əminsiz?
          </span>
          <div className="mt-4 flex justify-between">
            <button
              disabled={isLoading}
              onClick={() => setToggle("")}
              className="rounded-xl bg-slate-700/90 px-4 py-1 font-semibold text-slate-100 hover:bg-slate-800 disabled:bg-slate-800/70"
            >
              Ləğv et
            </button>
            <button
              disabled={isLoading}
              onClick={deleteHandler}
              className="rounded-xl bg-red-700/90 px-6 py-1 font-semibold text-slate-100 hover:bg-red-800 disabled:bg-red-700/70"
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default SaleDeleteForm;
