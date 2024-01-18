import { useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineXCircle,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useUpdateCustomer } from "./useUpdateCustomer";
import CustomerDeleteForm from "./CustomerDeleteForm";
import { formatCurrencyNumber } from "../../utils/helpers";

function CustomerTableRow({ customer, salesTotal }) {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);
  const [toggle, setToggle] = useState("");

  const [name, setName] = useState(customer.name);
  const [contact, setContact] = useState(customer.contact);
  const [note, setNote] = useState(customer.note || "");

  const { updateCustomer, isCustomerUpdating } = useUpdateCustomer();

  const navigate = useNavigate();
  function editHandler() {
    if (isCustomerUpdating) return;
    const updateCustomerData = {
      name,
      contact,
      note,
    };

    const oldDataArr = JSON.parse(customer.oldData);
    oldDataArr.push({
      changedAt: new Date(),
      name: customer.name,
      contact: customer.contact,
      note: customer.note,
    });
    updateCustomerData.oldData = oldDataArr;
    console.log(updateCustomerData);
    updateCustomer({ id: customer.id, object: updateCustomerData });
    setEdit(false);
  }

  function viewHandler() {
    navigate(customer.id);
  }

  const customerSales = salesTotal.reduce(
    (acc, cur) =>
      cur.customer_id === customer.id ? acc + cur.totalRevenue : acc,
    0,
  );

  const customerPaid = salesTotal.reduce(
    (acc, cur) => (cur.customer_id === customer.id ? acc + cur.paid : acc),
    0,
  );

  return (
    <tr
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`${
        hover ? "cursor-pointer shadow-md " : ""
      } border-b border-slate-200  text-center transition-all`}
    >
      <td className="h-14 md:p-2 md:px-6 md:pl-16">
        {edit ? (
          <input
            className="w-[70%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          `${customer.name}`
        )}
      </td>
      <td className="h-14 md:p-2 md:px-6">
        {edit ? (
          <input
            className="w-[70%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md "
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        ) : (
          `${customer.contact}`
        )}
      </td>
      <td className="hidden h-14 p-2  px-6 lg:flex ">
        <div
          className={`${
            edit ? "justify-between" : "justify-center"
          }   items-center`}
        >
          {edit ? (
            <input
              className="w-[70%]  rounded-md border border-slate-700 bg-transparent px-3 py-1 text-center shadow-md "
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          ) : (
            <span>{customer.note || "Qeyd yoxdu"}</span>
          )}
        </div>
      </td>
      <td className="h-14 md:p-2 md:px-6">
        {formatCurrencyNumber(customerSales)}
      </td>
      <td className="h-14 md:p-2 md:px-6">
        {formatCurrencyNumber(customerSales - customerPaid)}
      </td>
      <td className=" hidden h-14 items-center justify-between md:flex md:p-2 md:px-6">
        <div
          className={`${
            hover && !edit ? "visible opacity-100" : "invisible opacity-0"
          } absolute flex gap-2 transition-all duration-300`}
        >
          <button
            onClick={viewHandler}
            className="rounded-full p-2 transition-all hover:bg-green-600/25"
          >
            <HiOutlineEye />
          </button>
          <button
            onClick={() => setEdit(true)}
            className="rounded-full p-2 transition-all hover:bg-green-600/25 disabled:cursor-not-allowed"
          >
            <HiOutlinePencil />
          </button>
          <button
            onClick={() => setToggle("delete")}
            className="rounded-full p-2 transition-all hover:bg-green-600/25"
          >
            <HiOutlineTrash />
          </button>
        </div>
        <div
          className={`${
            edit ? "visible opacity-100" : "invisible opacity-0"
          }  ml-4 flex text-xl transition-all duration-300`}
        >
          {edit && (
            <>
              <button
                disabled={isCustomerUpdating}
                onClick={() => setEdit(false)}
                className="rounded-full p-2 transition-all hover:bg-green-600/25 disabled:cursor-not-allowed"
              >
                <HiOutlineXCircle />
              </button>
              <button
                disabled={isCustomerUpdating}
                onClick={editHandler}
                className="rounded-full p-2 transition-all hover:bg-green-600/25"
              >
                <HiOutlineCheckCircle />
              </button>
            </>
          )}
        </div>
        {toggle === "delete" && (
          <CustomerDeleteForm customerId={customer.id} setToggle={setToggle} />
        )}
      </td>
    </tr>
  );
}

export default CustomerTableRow;
