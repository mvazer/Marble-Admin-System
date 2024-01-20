import { useState } from "react";
import { formatCurrency, formatSquareMeters } from "../../utils/helpers";
import { HiChevronDoubleDown, HiOutlinePencil } from "react-icons/hi2";
import ProductEditForm from "./ProductEditForm";

function WarehouseTableRow({ product, isLoss }) {
  const [hover, setHover] = useState(false);
  const [toggle, setToggle] = useState("");
  const {
    id,
    name,
    cost,
    quantity,
    thickness,
    width,
    length,
    paletteNumber,
    loss,
  } = product;

  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${
        quantity === 0 ? "" : ""
      } h-14 border-b border-slate-200 text-center hover:cursor-pointer hover:shadow-md`}
    >
      <td className=" p-2 px-4 md:pl-16">{name}</td>
      <td className=" p-2 px-4">{paletteNumber}</td>
      <td className=" p-2 px-4 ">{`${thickness}x${width}x${length}`}</td>
      <td className=" p-2 px-4">{formatCurrency(cost)}</td>
      <td className=" p-2 px-4">
        {isLoss ? (
          formatSquareMeters(loss)
        ) : quantity === 0 ? (
          <div className="mx-auto rounded-full bg-red-800 text-slate-50 md:w-16">
            Bitib
          </div>
        ) : hover ? (
          <button
            onClick={() => setToggle("edit")}
            className="rounded-full p-2 text-center transition-all hover:bg-green-600/25 disabled:cursor-not-allowed"
          >
            <HiOutlinePencil />
          </button>
        ) : (
          <div className="flex items-center justify-center">
            {loss && (
              <span className="text-red-800">
                <HiChevronDoubleDown />
              </span>
            )}
            {formatSquareMeters(quantity)}
          </div>
        )}
      </td>
      {toggle === "edit" && (
        <ProductEditForm
          setToggle={setToggle}
          id={id}
          container_id={id}
          leftQuantity={quantity}
          paletteNumber={paletteNumber}
          cost={cost}
        />
      )}
    </tr>
  );
}

export default WarehouseTableRow;
