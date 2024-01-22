import { Skeleton } from "@mui/material";
import { useRef, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { formatCurrencyNumber } from "../../utils/helpers";
import { useProductContainer } from "../Sales/useProductsName";
import WarehouseTableRow from "./WarehouseTableRow";
import ConfirmForm from "../../ui/ConfirmForm";
import toast from "react-hot-toast";
import { useDeleteContainer } from "./useDeleteContainer";
import { useDeleteProducts } from "./useDeleteProduct";
import { useDeleteCash } from "../Cash/useDeleteCash";

function ContainerTableRow({ item }) {
  const [collapse, setCollapse] = useState(false);
  const [toggle, setToggle] = useState("");
  const [hover, setHover] = useState(false);
  const buttonRef = useRef();

  const { products, isLoading } = useProductContainer(item.id);
  const { deleteCash, isCashDeleting } = useDeleteCash();
  const { deleteContainer, isDeletingContainer } = useDeleteContainer();
  const { deleteProducts, isDeletingProducts } = useDeleteProducts();

  const sumValue =
    isLoading ||
    products.product.reduce(
      (acc, cur) => acc + cur.cost * cur.initialQuantity,
      0,
    );

  function deleteHandler() {
    if (products.product.some((cur) => cur.quantity !== cur.initialQuantity)) {
      toast.error("Üzərindən satış olumuş konteyner silinə bilməz");
      setToggle("");
      return;
    }
    deleteProducts(item.id)
      .then(() => deleteCash(item.id))
      .then(() => deleteContainer(item.id));
  }

  return (
    <>
      <tr
        onClick={(e) =>
          !buttonRef.current.contains(e.target) && setCollapse((s) => !s)
        }
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="hidden h-[4.5rem] border-b border-slate-300 text-center hover:cursor-pointer hover:shadow-md md:table-row"
      >
        <td className="p-4 px-6 pl-16 font-semibold">{item.arrivalDate}</td>
        <td className="p-4 px-6 font-semibold">{item.sourceCountry}</td>
        <td className="p-4 px-6 font-semibold">
          {formatCurrencyNumber(item.customCost)}
        </td>
        <td className="p-4 px-6 font-semibold">
          {formatCurrencyNumber(item.shippingCost)}
        </td>
        <td className="p-4 px-6 font-semibold">
          {formatCurrencyNumber(item.extraCosts)}
        </td>
        <td className="p-4 px-6 font-semibold">
          {isLoading ? (
            <Skeleton
              variant="rounded"
              sx={{ bgcolor: "grey.100" }}
              animation="wave"
              height={20}
              width={"100%"}
            />
          ) : hover ? (
            <button
              ref={buttonRef}
              onClick={() => setToggle("delete")}
              className="rounded-full p-2 text-center transition-all hover:bg-green-600/25 disabled:cursor-not-allowed"
            >
              <HiOutlineTrash />
            </button>
          ) : (
            formatCurrencyNumber(sumValue)
          )}
        </td>
      </tr>
      {collapse && (
        <>
          <tr className="hidden border-b  border-slate-300 text-center md:table-row">
            <td className="p-4 px-6 pl-16 font-semibold">Ad</td>
            <td className="p-4 px-6 font-semibold">Palet №</td>
            <td className="p-4 px-6 font-semibold">Ölçü</td>
            <td className="p-4 px-6 font-semibold">Maya dəyəri</td>
            <td className="p-4 px-6 font-semibold">Miqdar</td>
            <td className="p-4 px-6 font-semibold">İlkin Miqdar</td>
          </tr>
          {isLoading ||
            products.product.map((product) => (
              <WarehouseTableRow
                isContainer={true}
                key={product.id}
                product={product}
              />
            ))}
        </>
      )}
      {toggle === "delete" && (
        <ConfirmForm
          loading={isDeletingContainer || isDeletingProducts || isCashDeleting}
          submitHandler={deleteHandler}
          setToggle={setToggle}
        >
          Konteyneri silmək istədiyinizə əminsiz? (Üzərindən satış olumuş
          konteyner silinə bilməz)
        </ConfirmForm>
      )}
    </>
  );
}

export default ContainerTableRow;
