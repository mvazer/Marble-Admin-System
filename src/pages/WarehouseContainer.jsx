import { HiOutlineChevronRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import ContainerTable from "../features/Warehouse/ContainerTable";

function WarehouseContainer() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col items-center justify-between pt-6 md:flex-row ">
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
          <h1 className="text-lg font-semibold ">Konteynerlər</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <ContainerTable />
      </div>
    </>
  );
}

export default WarehouseContainer;
