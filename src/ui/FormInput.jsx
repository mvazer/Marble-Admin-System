import { Skeleton } from "@mui/material";

function FormInput({
  id,
  type = "",
  defaultValue,
  children,
  register,
  required = false,
  errors,
  note,
  onChange = () => {},
  max,
  width,
  pattern,
  minLength,
  validate,
  isLoading,
  prefix,
}) {
  const idArray = id.split(".");
  let errorId;

  if (errors) {
    if (errors.product && errors?.product.hasOwnProperty([idArray[1]])) {
      errorId = errors?.product[idArray[1]][idArray[2]];
    } else {
      errorId = errors[idArray[0]];
    }
  }

  return (
    <div className={`flex flex-col gap-2 px-2 ${width} `}>
      <label
        className="flex items-center justify-between font-semibold"
        htmlFor={id}
      >
        <span>{children}</span>
        {note &&
          (isLoading ? (
            <Skeleton
              variant="text"
              sx={{ bgcolor: "grey.100" }}
              animation="wave"
              width={"60%"}
            />
          ) : (
            <span className="px-2 text-sm font-normal text-green-700">
              {note}
            </span>
          ))}
      </label>

      {isLoading ? (
        <Skeleton
          variant="rounded"
          sx={{ bgcolor: "grey.100" }}
          animation="wave"
          height={40}
        />
      ) : (
        <>
          <input
            className={`${
              prefix ? `${prefix.length > 1 ? "pl-9" : "pl-7"}` : ""
            } h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md `}
            type={type}
            step="any"
            defaultValue={
              type === "date"
                ? new Date().toISOString().substring(0, 10)
                : defaultValue
            }
            id={id}
            {...register(id, {
              required: required,
              onChange,
              max,
              pattern,
              minLength,
              validate,
            })}
          />
          {prefix && <div className="absolute translate-y-10 translate-x-3">{prefix}</div>}
        </>
      )}
      <span
        className={`${
          errors && errorId && required
            ? "visible opacity-100"
            : "invisible opacity-0"
        } text-sm text-red-600`}
      >
        {errors && errorId && required && errorId.message
          ? errorId.message
          : "Bu xana vacibdir."}
      </span>
    </div>
  );
}

export default FormInput;
