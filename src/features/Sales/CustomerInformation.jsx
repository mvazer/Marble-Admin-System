import { useState } from "react";
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi2";
import ControlledInput from "../../ui/ControlledInput";
import { useAddCustomer } from "../Customers/useAddCustomer";
import { useCustomer } from "../Customers/useCustomer";

function CustomerInformation({ register, errors }) {
  const [showForm, setShowForm] = useState(false);
  const [errorForm, setErrorForm] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [note, setNote] = useState("");
  const [customer, setCustomer] = useState({});

  const { customers, isLoadingCustomers } = useCustomer();
  const { addCustomer, isCustomerAdding } = useAddCustomer();

  function selectHandler(e) {
    if (!e.target.value) {
      setShowCustomer(false);
      return;
    }
    setShowCustomer(true);
    setCustomer(
      () => customers.customer.filter((obj) => obj.id === e.target.value)[0],
    );
  }

  function showHandler(e) {
    e.preventDefault();
    setShowForm((v) => !v);
  }

  function addCustomerHandler(e) {
    e.preventDefault();
    if (!name) {
      setErrorForm(true);
      return;
    }
    const customerData = { name, contact, note };
    addCustomer(customerData);
    setName("");
    setContact("");
    setNote("");
    setShowForm(false);
  }
  return (
    <div className="space-y-4 px-4 pb-8">
      <h1 className="px-24 pt-6 text-center text-xl font-semibold uppercase">
        Müştəri məlumatları
      </h1>
      <div className="flex flex-wrap justify-normal  gap-4">
        <div className="flex flex-col gap-2 px-2">
          <label className="font-semibold">Müştəri</label>
          <div className="flex items-center gap-3">
            <select
              {...register("customer.name", { required: true })}
              onChange={selectHandler}
              className="h-10 w-52 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md"
            >
              <option value="">Seç</option>
              {!isLoadingCustomers &&
                customers?.customer?.map((option) => (
                  <option value={option.id} key={option.id}>
                    {option.name}
                  </option>
                ))}
            </select>
            <div
              className={`${
                !showCustomer ? "visible opacity-100" : "invisible opacity-0"
              } transition-all`}
            >
              {!showCustomer && (
                <button
                  onClick={showHandler}
                  className="text-3xl transition-colors hover:text-slate-600"
                >
                  {!showForm ? (
                    <HiOutlinePlusCircle />
                  ) : (
                    <HiOutlineMinusCircle />
                  )}
                </button>
              )}
            </div>
          </div>
          {errors?.customer && (
            <span className="text-sm text-red-600">Bu xana vacibdir.</span>
          )}
        </div>
        <div
          className={`${
            showCustomer ? "visible opacity-100" : "invisible opacity-0"
          } flex w-[25%] basis-1/2 flex-wrap gap-3 transition-all`}
        >
          <div className="flex w-[45%] flex-col gap-2 px-2">
            <label className="flex items-center justify-between font-semibold">
              <span>Əlaqə nömrəsi</span>
            </label>
            <span className="h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md">
              {customer?.contact}
            </span>
          </div>
          <div className="flex w-[45%] flex-col gap-2 px-2">
            <label className="flex items-center justify-between font-semibold">
              <span>Qeyd</span>
            </label>
            <span className="h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md">
              {!customer?.note ? "Qeyd yoxdu" : customer?.note}
            </span>
          </div>
        </div>
        <div
          className={`${
            showForm && !showCustomer
              ? "visible -translate-y-0  opacity-100"
              : "invisible -translate-y-20  opacity-0"
          } flex flex-wrap gap-3 transition-all`}
        >
          {showForm && !showCustomer && (
            <>
              <ControlledInput
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  e.target.value ? setErrorForm(false) : setErrorForm(true);
                }}
                required={errorForm}
                type="text"
                id={`customer.name`}
              >
                Adı
              </ControlledInput>
              <ControlledInput
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                type="text"
                id={`customer.contact`}
              >
                Əlaqə nömrəsi
              </ControlledInput>
              <ControlledInput
                value={note}
                onChange={(e) => setNote(e.target.value)}
                type="text"
                id={`customer.note`}
              >
                Qeyd
              </ControlledInput>
              <button
                disabled={isCustomerAdding}
                onClick={addCustomerHandler}
                className=" h-10 self-end rounded-lg bg-slate-700/10 px-6 py-1 text-lg backdrop-blur-md transition-colors hover:bg-slate-500/30 "
              >
                {isCustomerAdding ? "Əlavə edilir..." : "Əlavə et"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerInformation;
