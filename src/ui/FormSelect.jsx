import { Skeleton } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMinusCircle, HiOutlinePlusCircle } from "react-icons/hi2";

function FormSelect({
  children,
  register,
  required,
  errors,
  id,
  options,
  optionName,
  addOption,
  isOptionAdding,
  onChange,
  isLoading,
}) {
  const [showForm, setShowForm] = useState(false);
  const [addOptionName, setAddOptionName] = useState("");
  const [errorForm, setErrorForm] = useState(false);

  const idArray = id.split(".");
  let errorId;

  if (errors) {
    if (errors.product && errors?.product.hasOwnProperty([idArray[1]])) {
      errorId = errors?.product[idArray[1]][idArray[2]];
    } else {
      errorId = errors[idArray[0]];
    }
  }

  function showHandler(e) {
    e.preventDefault();
    setShowForm((s) => !s);
  }

  function addOptionHandler(e) {
    e.preventDefault();
    if (!addOptionName) {
      setErrorForm(true);
      return;
    }

    const capitalizedOptionName = addOptionName
      .split(" ")
      .map((obj) => obj.charAt(0).toUpperCase() + obj.slice(1).toLowerCase())
      .join(" ");

    const newOption = optionName + ":" + capitalizedOptionName;

    if (options.some((option) => option.option === newOption)) {
      toast.error(`${capitalizedOptionName} seçimi artıq yaradılıb`);
      return;
    }
    addOption({ option: newOption });
    setAddOptionName("");
    setShowForm(false);
  }

  return (
    <>
      <div className="flex basis-1/4 flex-col gap-2 px-2 ">
        <label htmlFor={id} className="font-semibold">
          {children}
        </label>
        <div className="flex items-center gap-3">
          {isLoading ? (
            <Skeleton
              variant="rounded"
              sx={{ bgcolor: "grey.100" }}
              animation="wave"
              height={40}
              width={"100%"}
            />
          ) : (
            <select
              {...register(id, { required: required })}
              onChange={onChange && onChange}
              className="h-10 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md"
            >
              <option value="">Seç</option>
              {options
                ?.sort((a, b) => a.option.localeCompare(b.option))
                .map((option) => {
                  const object = option.option.split(":");
                  const [key, value] = object;
                  if (optionName === key)
                    return (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    );
                })}
            </select>
          )}
          <div className={`${!addOption && "hidden"}`}>
            <button
              onClick={showHandler}
              className="text-3xl transition-colors hover:text-slate-600"
            >
              {!showForm ? <HiOutlinePlusCircle /> : <HiOutlineMinusCircle />}
            </button>
            <div
              className={`${
                showForm ? "visible opacity-100 " : "invisible opacity-0"
              } ${
                errorForm ? " -translate-y-28" : " -translate-y-24"
              } fixed flex w-[28%] translate-x-10 flex-col items-center  gap-3  rounded-3xl bg-slate-100/70 px-8 py-4 shadow-lg backdrop-blur-md  transition-all z-10 `}
            >
              <label className="text-center font-semibold">
                {children} üçün əlavə olunacaq seçim
              </label>
              <input
                className="h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md"
                value={addOptionName}
                onChange={(e) => {
                  setAddOptionName(e.target.value);
                  !e.target.value.length > 0
                    ? setErrorForm(true)
                    : setErrorForm(false);
                }}
              />
              {errorForm && (
                <span className="text-sm text-red-600">Bu xana vacibdir.</span>
              )}
              <button
                disabled={isOptionAdding}
                onClick={addOptionHandler}
                className="w-[70%] rounded-lg bg-slate-300 px-4 py-1 text-lg text-slate-800 backdrop-blur-md transition-colors hover:bg-slate-400"
              >
                {isOptionAdding ? "Əlavə edilir..." : "Əlavə et"}
              </button>
            </div>
          </div>
        </div>
        {errors && errorId && (
          <span className="text-sm text-red-600">Bu xana vacibdir.</span>
        )}
      </div>
    </>
  );
}

export default FormSelect;
