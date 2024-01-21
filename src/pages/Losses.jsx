import { HiOutlineChevronRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import WarehouseTable from "../features/Warehouse/WarehouseTable";
import { useLossProducts } from "../features/Warehouse/useProducts";
import Spinner from "../ui/Spinner";
import { formatCurrencyNumber } from "../utils/helpers";

function Losses() {
  const navigate = useNavigate();
  const { products, isLoading } = useLossProducts();
  return (
    <>
      <div className="flex flex-col items-center justify-between md:flex-row pt-6 ">
        <div className="flex  gap-2 ">
          <h1
            onClick={() => navigate("/warehouse")}
            className="flex items-center gap-1 text-xl font-bold hover:cursor-pointer hover:text-slate-700 md:pl-24"
          >
            Anbar
            <span className="text-sm">
              <HiOutlineChevronRight />
            </span>
          </h1>
          <h1 className="text-lg font-semibold ">İtkilər</h1>
        </div>
        {isLoading || (
          <div className="px-24 font-semibold">
            Ümumi itki məbləği: {' '}
            {formatCurrencyNumber(
              products.product.reduce(
                (acc, cur) => acc + cur.loss * cur.quantity,
                0,
              ),
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        {isLoading ? <Spinner /> : <WarehouseTable products={products} isLoss={true} />}
      </div>
    </>
  );
}

export default Losses;
