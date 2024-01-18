import NewProductForm from "../features/Warehouse/NewProductForm";
import WarehouseTable from "../features/Warehouse/WarehouseTable";
import FilterWithOptions from "../ui/FilterWithOptions";
import Modal from "../ui/Modal";
import SortBy from "../ui/SortBy";

function Warehouse() {
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
        <FilterWithOptions />

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
        <WarehouseTable />
      </div>
    </>
  );
}

export default Warehouse;
