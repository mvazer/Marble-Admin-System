import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import TableHead from "../../ui/TableHead";
import WarehouseTableRow from "./WarehouseTableRow";

function WarehouseTable({ products, isLoss = false }) {
  const [searcParams] = useSearchParams();

  const sortBy = searcParams.get("sortBy") || "nameAsc";

  const filterBy = searcParams.get("filterBy") || "all";

  const page = Number(searcParams.get("page")) || 1;

  const NUM_RESULT = 10;

  const filteredProducts = products.product.filter(
    (product) => filterBy === "all" || product.name === filterBy,
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "nameAsc") return a.name.localeCompare(b.name);
    if (sortBy === "nameDesc") return b.name.localeCompare(a.name);
    if (sortBy === "paletteNumberAsc") return a.paletteNumber - b.paletteNumber;
    if (sortBy === "paletteNumberDesc")
      return b.paletteNumber - a.paletteNumber;
    if (sortBy === "quantityAsc") return a.quantity - b.quantity;
    if (sortBy === "quantityDesc") return b.quantity - a.quantity;
  });

  const pagedProducts = sortedProducts.slice(
    page > 0 ? NUM_RESULT * page - NUM_RESULT : 1,
    page <= Math.ceil(sortedProducts.length / NUM_RESULT)
      ? NUM_RESULT * page
      : Math.ceil(sortedProducts.length / NUM_RESULT),
  );

  return (
    <>
      <table className="w-full table-fixed border-collapse overflow-hidden rounded-3xl border-2 border-hidden p-2 text-xs shadow-lg md:w-[90%] md:text-base">
        <TableHead
          headers={[
            "Ad",
            "Palet №",
            "Ölçü, md:w-fit w-[30%]",
            "Maya dəyəri",
            "Miqdar",
          ]}
        />
        <tbody>
          {pagedProducts.map((product) => (
            <WarehouseTableRow product={product} key={product.id} isLoss={isLoss} />
          ))}
        </tbody>
      </table>
      <Pagination object={sortedProducts} pageResult={NUM_RESULT} />
    </>
  );
}

export default WarehouseTable;
