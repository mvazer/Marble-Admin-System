import { format } from "date-fns";
import { useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineXCircle,
} from "react-icons/hi2";
import CostDeleteForm from "./CostDeleteForm";
import { formatNumber } from "../../utils/helpers";
import { useUpdateCost } from "./useUpdateCost";
import toast from "react-hot-toast";

function CostTableRow({ cost }) {
  const [toggle, setToggle] = useState("");

  const [name, setName] = useState(cost.name || "");
  // const [createdAt, setCreatedAt] = useState(cost.created_at || "");
  const [quantity, setQuantity] = useState(cost.quantity || 1);
  const [value, setValue] = useState(cost.value || 0);

  const [edit, setEdit] = useState(false);

  const { updateCost, isCostUpdating } = useUpdateCost();

  function editHandler() {
    if (isCostUpdating) return;
    const updateCostData = { name, quantity, value };
    if (
      name === cost.name &&
      Number(quantity) === cost.quantity &&
      Number(value) === cost.value
    ) {
      setEdit(false);
      return;
    }
    if (name.length < 1 || quantity.length < 1 || value.length < 1) {
      toast.error("Xanalar doldurulmalıdır");
      return;
    }
    updateCost({ id: cost.id, object: updateCostData });
    setEdit(false);
  }

  return (
    <tr>
      <td className="h-14 p-2 md:px-6">
        {edit ? (
          <input
            className="w-[100%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          `${cost.name}`
        )}
      </td>
      <td className="h-14 p-2 md:px-6 ">
        {format(new Date(cost.created_at), "yyyy.MM.dd")}

        {/* {edit ? (
          <input
            type="date"
            className="w-[100%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md "
            value={new Date(createdAt).toISOString().substring(0, 10)}
            onChange={(e) => setCreatedAt(e.target.value)}
          />
        ) : (
        )} */}
      </td>
      <td className="h-14 p-2 md:px-6">
        {edit ? (
          <input
            className="w-[100%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md "
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        ) : (
          `${cost.quantity}`
        )}
      </td>
      <td className="h-14 p-2 md:px-6">
        {edit ? (
          <input
            className="w-[100%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md "
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          `₼ ${formatNumber(cost.value)}`
        )}
      </td>
      <td className="h-14 p-2 md:px-6">
        {edit ? (
          <span
            className="w-[100%] rounded-md border border-slate-700 bg-transparent
            px-3 py-1 text-center shadow-md "
          >
            {" "}
            {value * quantity}
          </span>
        ) : (
          `₼ ${formatNumber(cost.value * cost.quantity)}`
        )}
      </td>
      <td className=" hidden h-14 items-center justify-between md:flex md:p-2 md:px-6">
        <button
          onClick={() => setEdit((e) => !e)}
          className="rounded-full p-2 transition-all hover:bg-green-600/25 disabled:cursor-not-allowed"
        >
          {edit ? <HiOutlineXCircle /> : <HiOutlinePencil />}
        </button>
        <button
          disabled={isCostUpdating}
          onClick={() => {
            !edit && setToggle("delete");
            edit && editHandler();
          }}
          className="rounded-full p-2 transition-all hover:bg-green-600/25"
        >
          {edit ? <HiOutlineCheckCircle /> : <HiOutlineTrash />}
        </button>
      </td>
      {/* <div
        className={`${
          edit ? "visible opacity-100" : "invisible opacity-0"
        }  flex text-xl transition-all duration-300`}
      >
        {edit && (
          <>
            <button
              //   disabled={isCustomerUpdating}
              onClick={() => setEdit(false)}
              className="rounded-full p-2 transition-all hover:bg-violet-600/25 disabled:cursor-not-allowed"
            >
              <HiOutlineXCircle />
            </button>
            <button
              //   disabled={isCustomerUpdating}
              //   onClick={editHandler}
              className="rounded-full p-2 transition-all hover:bg-violet-600/25"
            >
              <HiOutlineCheckCircle />
            </button>
          </>
        )}
      </div> */}
      {toggle === "delete" && (
        <CostDeleteForm costId={cost.id} setToggle={setToggle} />
      )}
    </tr>
  );
}

export default CostTableRow;
