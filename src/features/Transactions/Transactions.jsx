import { useState } from "react";
import TransactionsTable from "./TransactionsTable";

function Transactions() {
  const [newTransaction, setNewTransaction] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center justify-between pt-4 md:flex-row md:px-24">
        <h1 className=" text-xl font-bold">Əməliyyatlar</h1>
        <button
          onClick={() => setNewTransaction((t) => !t)}
          className={` hidden rounded-lg bg-slate-800 px-4 py-2 text-center text-sm font-medium text-slate-50 transition-all duration-150 hover:bg-slate-600 md:block`}
        >
          + Yeni əməliyyat
        </button>
      </div>
      <div
        className={`flex flex-col items-center justify-center gap-4 p-6 transition-all`}
      >
        <TransactionsTable
          newTransaction={newTransaction}
          setNewTransaction={setNewTransaction}
        />
      </div>
    </>
  );
}

export default Transactions;
