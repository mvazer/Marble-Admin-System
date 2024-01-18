import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi2";
import { useAddCost } from "./useAddCost";
import SpinnerMini from "../../ui/SpinnerMini";

function NewCostTableRow({ newCost, setNewCost }) {
  const [name, setName] = useState("");

  const [quantity, setQuantity] = useState(0);
  const [value, setValue] = useState(0);

  const { addCost, isCostAdding } = useAddCost();

  function submitHandler() {
    if (isCostAdding) return;
    const newCostData = { name, quantity, value };

    if (name.length < 1 || quantity.length < 1 || value.length < 1) {
      toast.error("Xanalar doldurulmalıdır");
      return;
    }
    addCost(newCostData);
    setNewCost(false);
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
      <td className="h-14 p-2 px-6 ">
        <span className="w-[100%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md ">
          {format(new Date(), "yyyy.MM.dd")}
        </span>
      </td>
      <td className="h-14 p-2 px-6">
        <input
          className="w-[100%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md "
          value={quantity}
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
        />
      </td>
      <td className="h-14 p-2 px-6">
        <input
          className="w-[100%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md "
          value={value}
          type="number"
          onChange={(e) => setValue(e.target.value)}
        />
      </td>
      <td className="h-14 p-2 px-6">
        <span
          className="w-[100%] rounded-md border border-slate-700 bg-transparent
                px-3 py-1 text-center shadow-md "
        >
          {" "}
          {value * quantity}
        </span>
      </td>
      <td>
        <button
          onClick={() => setNewCost(false)}
          className="rounded-full p-2 transition-all hover:bg-green-600/25 disabled:cursor-not-allowed"
        >
          <HiOutlineXCircle />
        </button>
        <button
          disabled={isCostAdding}
          onClick={submitHandler}
          className="rounded-full p-2 transition-all hover:bg-green-600/25"
        >
          {isCostAdding ? <SpinnerMini /> : <HiOutlineCheckCircle />}
        </button>
      </td>
    </tr>
  );
}

export default NewCostTableRow;
