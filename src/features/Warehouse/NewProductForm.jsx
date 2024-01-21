import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { v4 as uuidv4 } from "uuid";
import FormInput from "../../ui/FormInput";
import ProductRow from "./ProductRow";
import { useAddContainer } from "./useAddContainer";
import { useAddProduct } from "./useAddProduct";
import FormSelect from "../../ui/FormSelect";
import { useOptions } from "./useOptions";
import { useAddOption } from "./useAddOption";
import toast from "react-hot-toast";
import { useProducts } from "./useProducts";
import Spinner from "../../ui/Spinner";
import { useAddCash } from "../Cash/useAddCash";

function NewProductForm({ onClose }) {
  const [numProductRows, setMumProductRows] = useState([
    { id: Math.random().toString().split(".")[1] },
  ]);
  const { addContainer, isAddingContainer } = useAddContainer();
  const { addProduct, isAddingProduct } = useAddProduct();
  const { products, isLoading: isProductsLoading } = useProducts();
  const { options, isOptionsLoading } = useOptions();
  const { addOption, isOptionAdding } = useAddOption();
  const { addCash, isCashAdding } = useAddCash();
  const dataIsAdding = isAddingContainer || isAddingProduct || isCashAdding;
  const isLoading = isOptionsLoading || isProductsLoading;

  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const uuid = uuidv4();
    const containerData = {
      id: uuid,
      ...data,
    };
    delete containerData.product;

    const productData = numProductRows.map((row) => ({
      ...data.product[row.id],
      container_id: uuid,
      cost: 1,
      initialQuantity: data.product[row.id].quantity,
    }));

    const containerCost =
      Number(data.customCost) +
      Number(data.extraCosts) +
      Number(data.shippingCost);

    const totalProductQuantity = productData.reduce(
      (acc, cur) => acc + Number(cur.quantity),
      0,
    );

    const totalProductCost = productData.reduce(
      (acc, cur) => acc + Number(cur.quantity) * Number(cur.price),
      0,
    );

    productData.map(
      (product) =>
        (product.cost =
          containerCost / totalProductQuantity + Number(product.price)),
    );

    const totalCost = totalProductCost + containerCost;

    const samePaletteNumbers = productData.reduce((acc, _, i, arr) => {
      if (arr.length !== i + 1)
        arr.forEach((_, insideIndex) => {
          if (
            arr.length !== insideIndex + 1 &&
            insideIndex >= i &&
            Number(arr[i].paletteNumber) ===
              Number(arr[insideIndex + 1].paletteNumber)
          ) {
            if (!acc.some((data) => data === arr[i])) acc.push(arr[i]);
            if (!acc.some((data) => data === arr[insideIndex + 1]))
              acc.push(arr[insideIndex + 1]);
          }
        });
      return acc;
    }, []);

    const samePaletteNumbersDatabase = products.product.reduce((acc, data) => {
      productData.forEach((product) => {
        if (Number(product.paletteNumber) === data.paletteNumber) {
          acc.push(product);
        }
      });
      return acc;
    }, []);

    const samePaletteNumbersSize = samePaletteNumbers.reduce((acc, cur) => {
      if (!acc.some((p) => p === cur.paletteNumber))
        acc.push(cur.paletteNumber);
      return acc;
    }, []);

    const samePaletteNumbersDatabaseSize = samePaletteNumbersDatabase.reduce(
      (acc, cur) => {
        if (!acc.some((p) => p === cur.paletteNumber))
          acc.push(cur.paletteNumber);
        return acc;
      },
      [],
    );

    // const samePaletteNumbersSum = samePaletteNumbers.reduce((acc, cur) => {
    //   if (!acc.some((p) => p.paletteNumber === cur.paletteNumber))
    //     acc.push({
    //       paletteNumber: cur.paletteNumber,
    //       sum: Number(cur.quantity),
    //     });
    //   else {
    //     acc.forEach((p) => {
    //       if (p.paletteNumber === cur.paletteNumber)
    //         p.sum = p.sum + Number(cur.quantity);
    //     });
    //   }

    //   return acc;
    // }, []);

    // console.log(productData);
    if (samePaletteNumbers.length) {
      toast.error(
        `${samePaletteNumbersSize.join(", ")} ${
          samePaletteNumbersSize.length > 1
            ? " palet nömrələri ilə paletlər mövcuddur."
            : " palet nömrəsi ilə palet mövcuddur."
        } Eyni palet nömrəsi ilə bir neçə palet əlavə etmək olmaz.`,
      );
      return;
    }

    if (samePaletteNumbersDatabase.length) {
      toast.error(
        `${samePaletteNumbersDatabaseSize.join(", ")} ${
          samePaletteNumbersDatabaseSize.length > 1
            ? " palet nömrələri ilə anbarda paletlər mövcuddur."
            : " palet nömrəsi ilə anbarda palet mövcuddur."
        } Eyni palet nömrəsi ilə bir neçə palet əlavə etmək olmaz.`,
      );
      return;
    }

    // return;

    addCash({
      name: `${containerData.arrivalDate} Konteyner`,
      value: totalCost * -1,
    })
      .then(() => addContainer(containerData))
      .then(() =>
        addProduct(productData, {
          onSuccess: () => {
            reset();
            onClose();
          },
        }),
      );
  };

  function addNewFormHandler(e) {
    e.preventDefault();
    const id = Math.random().toString().split(".")[1];
    setMumProductRows((v) => [...v, { id }]);
    if (numProductRows.length < 1) return;
    const lastObj = getValues("product")[numProductRows.at(-1).id];

    setValue(`product.${id}.paletteNumber`, Number(lastObj.paletteNumber) + 1);
  }

  function duplicateFormHandler(e, clickedId) {
    e.preventDefault();
    const obj = getValues("product")[clickedId];
    const lastObj = getValues("product")[numProductRows.at(-1).id];
    const rowId = Math.random().toString().split(".")[1];
    setMumProductRows((v) => [...v, { id: rowId }]);
    Object.keys(obj).map((key, i) =>
      key === "paletteNumber"
        ? setValue(
            `product.${rowId}.${key}`,
            (Number(lastObj.paletteNumber) + 1).toString(),
          )
        : setValue(`product.${rowId}.${key}`, Object.values(obj)[i]),
    );
  }

  function removeRowHandler(e, id) {
    e.preventDefault();
    setMumProductRows((v) => v.filter((row) => row.id !== id));
    unregister(`product.${id}`);
  }

  const nextPaletteNumber =
    products.product.length > 0
      ? products.product.sort((a, b) => b.paletteNumber - a.paletteNumber)[0]
          .paletteNumber + 1
      : 1;
  if (isLoading) return <Spinner />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 px-4 pb-8">
        <h1 className="px-24 pt-6 text-center text-xl font-semibold uppercase">
          Konteyner xərcləri
        </h1>
        <div className="flex flex-wrap justify-between gap-4 ">
          <FormInput type="date" id={"arrivalDate"} register={register}>
            Gəliş tarixi
          </FormInput>
          <FormSelect
            register={register}
            required={true}
            errors={errors}
            id={"sourceCountry"}
            options={!isOptionsLoading ? options.options : []}
            optionName="sourceCountry"
            addOption={addOption}
            isOptionAdding={isOptionAdding}
          >
            Ölkə mənbəyi
          </FormSelect>

          <FormInput
            register={register}
            required={true}
            errors={errors}
            type="number"
            id={"shippingCost"}
            prefix="₼"
          >
            Yol xərci
          </FormInput>
          <FormInput
            register={register}
            required={true}
            errors={errors}
            type="number"
            id={"customCost"}
            prefix="₼"
          >
            Gömrük xərci
          </FormInput>
          <FormInput
            register={register}
            required={true}
            errors={errors}
            type="number"
            id={"extraCosts"}
            prefix="₼"
          >
            Əlavə xərclər
          </FormInput>
        </div>
      </div>
      {numProductRows.map((row, i) => (
        <ProductRow
          numProduct={i + 1}
          id={row.id}
          key={row.id}
          removeRowHandler={removeRowHandler}
          duplicateFormHandler={duplicateFormHandler}
          register={register}
          setValue={setValue}
          errors={errors}
          nextPaletteNumber={nextPaletteNumber}
        />
      ))}
      <div className="flex items-center justify-center">
        <button
          onClick={addNewFormHandler}
          className="text-5xl transition-all hover:text-green-700"
        >
          <HiOutlinePlusCircle />
        </button>
        <button
          disabled={dataIsAdding}
          className=" absolute right-20 rounded-3xl border border-transparent bg-green-500 px-3  py-2 text-lg font-semibold text-stone-50 shadow-lg transition-all  hover:bg-green-400 hover:shadow-xl "
        >
          {!dataIsAdding ? "Təsdiqlə" : "Yüklənir..."}
        </button>
      </div>
    </form>
  );
}

export default NewProductForm;
