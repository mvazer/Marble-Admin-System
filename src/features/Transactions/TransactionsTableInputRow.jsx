import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import { useAddCash } from "../Cash/useAddCash";
import SpinnerMini from "../../ui/SpinnerMini";

function TransactionsTableInputRow({ setNewTransaction }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);

  const { addCash, isCashAdding } = useAddCash();

  function submitHandler() {
    if (isCashAdding) return;
    const newCashData = { name, value };

    if (name.length < 1 || value.length < 1) {
      toast.error("Xanalar doldurulmalıdır");
      return;
    }
    addCash(newCashData);
    setNewTransaction(false);
  }

  return (
    <tr>
      <td className="h-14 p-2 px-6">
        <input
          className="w-[100%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </td>
      <td className="h-14 p-2 px-6">
        <div className="w-[100%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md ">
          {format(new Date(), "yyyy.MM.dd")}
        </div>
      </td>
      <td className="h-14 p-2 px-6">
        <input
          className="w-[100%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md "
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </td>
      <td>
        <button
          onClick={() => setNewTransaction(false)}
          className="rounded-full p-2 transition-all hover:bg-green-600/25 disabled:cursor-not-allowed"
        >
          <HiOutlineXCircle />
        </button>
        <button
          disabled={isCashAdding}
          onClick={submitHandler}
          className="rounded-full p-2 transition-all hover:bg-green-600/25"
        >
          {isCashAdding ? <SpinnerMini /> : <HiOutlineCheckCircle />}
        </button>
      </td>
    </tr>
  );
}

export default TransactionsTableInputRow;
