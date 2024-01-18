import { useEffect, useRef, useState } from "react";
import FormInput from "../../ui/FormInput";
import FormSelect from "../../ui/FormSelect";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import { useOptions } from "../Warehouse/useOptions";
import { useProductsName } from "./useProductsName";
import { formatCurrency } from "../../utils/helpers";
import { Skeleton } from "@mui/material";

function SaleRow({
  numProduct,
  removeRowHandler,
  register,
  errors,
  id,
  setTotalSum,
  setTotalCost,
  setTotalQuantity,
  setValue,
}) {
  const [productName, setProductName] = useState("");
  const [palette, setPalette] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const inputValue = useRef({ price: 0, quantity: 0 });
  const filteredObjectRef = useRef();
  const { options, isOptionsLoading } = useOptions(id);
  const { products, isLoading, refetch } = useProductsName({
    value: productName,
    id,
  });

  const product = products?.product;
  const paletteNumbers =
    product &&
    product
      ?.filter((object) => object.quantity > 0)
      .map((object) => object.paletteNumber)
      .sort((a, b) => a - b);

  useEffect(() => {
    setIsFetching(true);
    refetch().finally(() => setIsFetching(false));
  }, [productName, refetch]);

  function onChange(e) {
    if (!e.target.value) setPalette(null);
    setPalette(null);
    setProductName(e.target.value);
  }

  function sumHandler(e) {
    inputValue.current = {
      price:
        e.target.name.split(".")[2] === "price"
          ? Number(e.target.value)
          : inputValue.current.price,
      quantity:
        e.target.name.split(".")[2] === "quantity"
          ? Number(e.target.value)
          : inputValue.current.quantity,
      cost,
      maxQuantity: Number(quantity),
    };

    setTotalSum((v) => ({
      ...v,
      [id]: inputValue.current.price * inputValue.current.quantity,
    }));

    setTotalCost((v) => ({
      ...v,
      [id]: inputValue.current.cost * inputValue.current.quantity,
    }));

    setTotalQuantity((v) => ({
      ...v,
      [id]: inputValue.current.maxQuantity - inputValue.current.quantity,
    }));
  }

  function onPaletteChange(e) {
    setPalette(e.target.value);
    filteredObjectRef.current = product.filter(
      (obj) => obj.paletteNumber === Number(e.target.value),
    )[0];
    if (filteredObjectRef.current?.id)
      setValue(
        `product.${id}.id`,
        filteredObjectRef.current?.id ? filteredObjectRef.current?.id : "",
      );
  }

  const { cost, quantity, thickness, width, length } = filteredObjectRef.current
    ?.name
    ? filteredObjectRef.current
    : {};

  // if (isLoading) return <Spinner />;

  return (
    <Row
      justify="normal"
      header={`Satış Məhsul ${numProduct}`}
      id={id}
      removeRowHandler={removeRowHandler}
    >
      <FormSelect
        onChange={onChange}
        register={register}
        required={true}
        errors={errors}
        id={`product.${id}.name`}
        options={!isOptionsLoading ? options.options : []}
        isLoading={isLoading}
        optionName="productName"
        // addOption={addOption}
        // isOptionAdding={isOptionAdding}
      >
        Adı
      </FormSelect>
      {!isLoading && paletteNumbers.length > 0 && (
        <>
          <div className="flex basis-[12%] flex-col gap-2 px-2">
            <label className="font-semibold">Palet №</label>
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
                {...register(`product.${id}.paletteNumber`, { required: true })}
                onChange={onPaletteChange}
                className="h-10 w-full rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md"
              >
                <option value="">Seç</option>
                {paletteNumbers.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {errors?.product?.hasOwnProperty(id) &&
              errors?.product[id]?.paletteNumber && (
                <span className="text-sm text-red-600">Bu xana vacibdir.</span>
              )}
          </div>
          {palette && (
            <>
              <FormInput
                register={register}
                required={true}
                errors={errors}
                note={`Maya dəyəri: ${formatCurrency(cost)}`}
                defaultValue={0}
                type="number"
                id={`product.${id}.price`}
                onChange={sumHandler}
                isLoading={isLoading}
                prefix="₼"
              >
                Qiymət (m²)
              </FormInput>
              <FormInput
                register={register}
                required={true}
                errors={errors}
                note={`Palet qalıq: ${quantity}m²`}
                type="number"
                id={`product.${id}.quantity`}
                prefix="m²"
                onChange={sumHandler}
                isLoading={isLoading}
                max={{
                  value: quantity,
                  message: "Miqdar palet qalıqdan çoxdu",
                }}
              >
                Miqdar (m²)
              </FormInput>
              <FormInput
                register={register}
                errors={errors}
                isLoading={isLoading}
                note={`Palet ölçü: ${thickness}x${
                  (width === length) === "Sərbəst boy"
                    ? "Sərbəst boy"
                    : `${width}x${length}`
                }`}
                type="text"
                id={`product.${id}.dimensions`}
                // pattern={{
                //   value: /^\d+x\d+x\d+$/,
                //   message: "Məlumat QxEnxUz şəklində yazılmalıdı. (2x40x100)",
                // }}
              >
                Ölçü (sm)
              </FormInput>
            </>
          )}
        </>
      )}
    </Row>
  );
}

export default SaleRow;
