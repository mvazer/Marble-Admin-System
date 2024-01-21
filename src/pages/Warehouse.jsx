import { useNavigate } from "react-router-dom";
import NewProductForm from "../features/Warehouse/NewProductForm";
import WarehouseTable from "../features/Warehouse/WarehouseTable";
import FilterWithOptions from "../ui/FilterWithOptions";
import Modal from "../ui/Modal";
import SortBy from "../ui/SortBy";
import { useProducts } from "../features/Warehouse/useProducts";
import Spinner from "../ui/Spinner";

function Warehouse() {
  const navigate = useNavigate();
  const { products, isLoading } = useProducts();

  return (
    <>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h1 className="pt-6 text-xl font-bold md:px-24">Anbar</h1>

        <Modal>
          <Modal.Button>+ Konteyner əlavə et</Modal.Button>
          <Modal.Form>
            <NewProductForm />
          </Modal.Form>
        </Modal>
      </div>
      <div className="flex flex-col items-center justify-between gap-4 pt-4 md:flex-row md:px-24">
        <div className="flex gap-1">
          <FilterWithOptions />
          <button
            onClick={() => navigate("container")}
            className={` mx-px hidden rounded-lg border border-slate-950 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 transition-all duration-150 hover:bg-slate-700 md:block`}
          >
            Konteynerlər
          </button>
          <button
            onClick={() => navigate("losses")}
            className={` mx-px hidden rounded-lg border border-slate-950 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 transition-all duration-150 hover:bg-slate-700 md:block`}
          >
            İtkilər
          </button>
        </div>

        <SortBy
          sortBy={[
            { value: "nameAsc", name: "Ada görə sırala(A-Z)" },
            { value: "nameDesc", name: "Ada görə sırala(Z-A)" },
            {
              value: "paletteNumberAsc",
              name: "Palet № görə sırala(Aşağı rəqəmlər birinci)",
            },
            {
              value: "paletteNumberDesc",
              name: "Palet № görə sırala(Yuxarı rəqəmlər birinci)",
            },
            {
              value: "quantityAsc",
              name: "Miqdara görə sırala(Az qalanlar birinci)",
            },
            {
              value: "quantityDesc",
              name: "Miqdara görə sırala(Çox qalanlar birinci)",
            },
          ]}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        {isLoading ? <Spinner /> : <WarehouseTable products={products} />}
      </div>
    </>
  );
}

export default Warehouse;
