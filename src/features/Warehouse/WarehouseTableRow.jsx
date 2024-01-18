import { formatCurrency, formatSquareMeters } from "../../utils/helpers";

function WarehouseTableRow({ product }) {
  const { name, cost, quantity, thickness, width, length, paletteNumber } =
    product;

  return (
    <tr
      className={`${
        quantity === 0 ? "" : ""
      } border-b border-slate-200 text-center`}
    >
      <td className=" p-2 px-4 md:pl-16">{name}</td>
      <td className=" p-2 px-4">{paletteNumber}</td>
      <td className=" p-2 px-4 ">{`${thickness}x${width}x${length}`}</td>
      <td className=" p-2 px-4">{formatCurrency(cost)}</td>
      <td className=" p-2 px-4">
        {quantity === 0 ? (
          <div className="mx-auto rounded-full bg-red-800 text-slate-50 md:w-16">
            Bitib
          </div>
        ) : (
          <div>{formatSquareMeters(quantity)}</div>
        )}
      </td>
    </tr>
  );
}

export default WarehouseTableRow;
