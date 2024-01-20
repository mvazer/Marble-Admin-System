import { addDays, format } from "date-fns";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";
import FormInput from "../../ui/FormInput";
import CustomerInformation from "./CustomerInformation";
import SaleRow from "./SaleRow";
import { useAddSale } from "./useAddSale";
import { useAddSaleTotal } from "./useAddSaleTotal";
import { useUpdateProduct } from "../Warehouse/useUpdateProduct";
import { formatCurrency } from "../../utils/helpers";
import toast from "react-hot-toast";

function NewSalesForm({ onClose }) {
  const [numProductRows, setMumProductRows] = useState([
    { id: Math.random().toString().split(".")[1] },
  ]);
  const [totalSum, setTotalSum] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [extraCost, setExtraCost] = useState(0);

  const [endDateCheck, setEndDateCheck] = useState(false);
  const [day, setDay] = useState(0);

  const { addSale, isAddingSale } = useAddSale();
  const { addSaleTotal, isAddingSaleTotal } = useAddSaleTotal();
  const { updateProduct, isUpdatingProduct } = useUpdateProduct();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    unregister,
    getValues,
    formState: { errors },
  } = useForm();

  // function quantitySum(data) {
  //   const products = Object.values(data.product);
  //   const paletteNumbers = products.map((product) => product.paletteNumber);
  //   const samePaletteNumber = paletteNumbers.reduce(
  //     (acc, currentValue, index, array) => {
  //       if (!acc[currentValue]) {
  //         acc[currentValue] = [];
  //       }

  //       const indexes = array
  //         .map((item, i) => (item === currentValue && i !== index ? i : null))
  //         .filter((item) => item !== null);

  //       if (indexes.length > 0 && !acc[currentValue].includes(index)) {
  //         indexes.push(index);
  //         acc[currentValue] = acc[currentValue].concat(indexes);
  //       }
  //       return acc;
  //     },
  //     {},
  //   );
  //   const quantities = Object.keys(samePaletteNumber).map((paletteNum) => {
  //     return {
  //       [paletteNum]: samePaletteNumber[paletteNum].reduce(
  //         (acc, num) => Number(products[num]?.quantity) + acc,
  //         0,
  //       ),
  //     };
  //   });
  // }

  function addNewFormHandler(e) {
    e.preventDefault();
    setMumProductRows((v) => [
      ...v,
      { id: Math.random().toString().split(".")[1] },
    ]);
  }

  const removeRowHandler = useCallback(
    (e, id) => {
      e.preventDefault();
      setMumProductRows((v) => v.filter((row) => row.id !== id));
      unregister(`product.${id}`);
    },
    [unregister],
  );

  const onSubmit = (data) => {
    const saleId = uuidv4();

    const { discount, advance, extraCost: extraCosts } = data;

    const saleTotalData = {
      id: saleId,
      customer_id: data.customer.name,
      discount,
      paid: advance,
      extraCosts,
      endDate: day === 0 ? "Son tarix yoxdu" : endDate,
      totalRevenue: totalValue,
      totalProfit: totalValue - costValue - extraCost,
    };

    const saleData = Object.values(data.product).map((product) => {
      const { price, quantity, dimensions } = product;
      return {
        customer_id: data.customer.name,
        product_id: product.id,
        price,
        quantity,
        dimensions,
        sale_id: saleId,
      };
    });

    const updateProductData = Object.values(data.product).reduce(
      (acc, product, i) => {
        if (!acc.some((d) => d.id === product.id))
          acc.push({
            object: { quantity: totalQuantity[Object.keys(data.product)[i]] },
            id: product.id,
            paletteNumber: product.paletteNumber,
          });
        else
          acc.forEach((d) => {
            if (d.id === product.id)
              d.object.quantity = d.object.quantity - Number(product.quantity);
          });

        return acc;
      },
      [],
    );

    // console.log(updateProductData);
    const sumQuantities = updateProductData.reduce((acc, d) => {
      if (d.object.quantity < 0) acc.push(d.paletteNumber);
      return acc;
    }, []);

    if (sumQuantities.length > 0) {
      toast.error(
        `Palet ${sumQuantities.join(
          ", ",
        )} satış miqdarı palet miqdarından artıqdır.`,
      );
      return;
    }

    // return;

    addSaleTotal(saleTotalData).then(() =>
      addSale(saleData).then(() =>
        updateProductData.map((data, i) =>
          updateProduct(data, {
            onSuccess: () => {
              reset();
              onClose();
            },
          }),
        ),
      ),
    );
  };

  const sumValue = Object.values(totalSum).reduce(
    (acc, currentValue) => acc + currentValue,
    0,
  );

  const totalValue = sumValue - discount + extraCost;

  const costValue = Object.values(totalCost).reduce(
    (acc, currentValue) => acc + currentValue,
    0,
  );

  const endDate = format(addDays(new Date(), Number(day)), "yyyy.MM.dd");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomerInformation register={register} errors={errors} />
      {numProductRows.map((row, i) => (
        <SaleRow
          setTotalSum={setTotalSum}
          setTotalCost={setTotalCost}
          numProduct={i + 1}
          removeRowHandler={removeRowHandler}
          id={row.id}
          key={row.id}
          register={register}
          errors={errors}
          setValue={setValue}
          setTotalQuantity={setTotalQuantity}
        />
      ))}
      <div className="flex items-center justify-center">
        <button
          onClick={addNewFormHandler}
          className="text-5xl transition-all hover:text-slate-500"
        >
          <HiOutlinePlusCircle />
        </button>
      </div>
      <div className="mt-8 flex items-start justify-start">
        <div className={`flex w-[19%] flex-col gap-2 px-2`}>
          <label
            className="flex items-center justify-between font-semibold"
            htmlFor="endDate"
          >
            <span>Sifariş müddəti (gün)</span>{" "}
            <input
              checked={endDateCheck}
              onChange={(e) => {
                setEndDateCheck(e.target.checked);
                setValue("endDate", e.target.checked ? "" : 0);
              }}
              type="checkbox"
              id="endDate"
            />
          </label>

          <input
            className={`${
              !endDateCheck ? "cursor-not-allowed bg-slate-100" : ""
            } h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md`}
            readOnly={!endDateCheck}
            type="number"
            defaultValue={0}
            id="endDate"
            {...register("endDate", {
              required: true,
              min: { value: 0, message: "Müsbət rəqəm olmalıdı" },
              onChange: (e) => setDay(e.target.value),
            })}
          />
          {errors?.endDate && (
            <span className="text-sm text-red-600">Bu xana vacibdir.</span>
          )}
          {endDateCheck && (
            <span className="text-sm text-green-700">Son tarix: {endDate}</span>
          )}
        </div>
        {/* <div className="mt-8 flex items-center justify-start">
        <div className={`flex w-[20%] flex-col gap-2 px-2`}>
          <label
            className="flex items-center justify-between font-semibold"
            htmlFor="endDate"
          >
            <span>Son təhvil tarixi</span>{" "}
            <input
              checked={endDateCheck}
              onChange={(e) => {
                setEndDateCheck(e.target.checked);
                setValue("endDate", e.target.checked ? "" : "Son tarix yoxdu");
              }}
              type="checkbox"
            />
          </label>

          <input
            className="h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md"
            readOnly={!endDateCheck}
            defaultValue='Son tarix yoxdu'
            id="endDate"
            {...register("endDate", { required: true })}
          />
          {errors?.endDate && (
            <span className="text-sm text-red-600">Bu xana vacibdir.</span>
          )}
          {endDateCheck && (
            <span className="text-sm text-yellow-700">
              Son tarix:
            </span>
          )}
        </div> */}

        <FormInput
          prefix="₼"
          width="w-[13%]"
          register={register}
          onChange={(e) => setDiscount(Number(e.target.value))}
          required={true}
          errors={errors}
          defaultValue={0}
          type="number"
          id={`discount`}
        >
          Endirim
        </FormInput>
        <FormInput
          prefix="₼"
          width="w-[13%]"
          register={register}
          onChange={(e) => setAdvance(Number(e.target.value))}
          required={true}
          errors={errors}
          defaultValue={0}
          type="number"
          id={`advance`}
        >
          Avans
        </FormInput>
        <FormInput
          prefix="₼"
          width="w-[13%]"
          register={register}
          onChange={(e) => setExtraCost(Number(e.target.value))}
          required={true}
          errors={errors}
          defaultValue={0}
          type="number"
          id={`extraCost`}
        >
          Əlavə xərclər
        </FormInput>

        <div className="ml-auto mt-8 flex flex-col text-end ">
          <span>
            Mənfəət:{" "}
            <span
              className={`${
                totalValue - costValue - extraCost < 0 && "text-red-500"
              } font-semibold`}
            >
              {formatCurrency(totalValue - costValue - extraCost)}
            </span>
          </span>
          <span>
            Qalıq:{" "}
            <span className="font-semibold">
              {formatCurrency(totalValue - advance)}
            </span>
          </span>
          <span>
            Ümumi məbləğ:{" "}
            <span className="font-semibold">{formatCurrency(totalValue)}</span>
          </span>
        </div>
        <button
          disabled={isAddingSale || isAddingSaleTotal || isUpdatingProduct}
          className="ml-6 mt-8 flex h-12 items-center rounded-3xl border border-transparent bg-green-500 px-6  text-lg font-semibold text-stone-50 shadow-lg transition-all  hover:bg-green-400 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-green-300 "
        >
          {!isAddingSale && !isAddingSaleTotal && !isUpdatingProduct
            ? "Təsdiqlə"
            : "Yüklənir..."}
        </button>
      </div>
    </form>
  );
}

export default NewSalesForm;
