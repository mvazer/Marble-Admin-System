import { useState } from "react";
import CostsTable from "../features/Costs/CostsTable";

function Costs() {
  const [newCost, setNewCost] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <h1 className="pt-6 text-xl font-bold md:px-24 ">Xərclər</h1>
        <button
          onClick={() => setNewCost((c) => !c)}
          className="mx-24 mt-6 hidden rounded-lg bg-slate-800 px-4 py-2 text-center text-sm font-medium text-slate-50 transition-all duration-150 hover:bg-slate-600 md:block"
        >
          {newCost ? "Ləğv et" : "+ Yeni xərc"}
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <CostsTable newCost={newCost} setNewCost={setNewCost} />
      </div>
    </>
  );
}

export default Costs;
