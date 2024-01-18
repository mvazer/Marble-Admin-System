import { formatCurrency, formatSquareMeters } from "../../utils/helpers";

function SaleTableRow({ sale, products }) {
  const product = products.find((obj) => obj.id === sale.product_id);

  return (
    <>
      <tr className="hidden border-b border-slate-200 text-center md:table-row">
        <td className="p-2 px-6 pl-16">{product.name}</td>
        <td className="p-2 px-6">{product.paletteNumber}</td>
        <td className="p-2 px-6">{sale.dimensions}</td>
        <td className="p-2 px-6">{formatSquareMeters(sale.quantity)}</td>
        <td className="p-2 px-6">{formatCurrency(sale.price)}</td>
        <td className="p-2 px-6">
          {formatCurrency(sale.price * sale.quantity)}
        </td>
      </tr>
    </>
  );
}

export default SaleTableRow;
