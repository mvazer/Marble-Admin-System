import { useState } from "react";
import FormInput from "../../ui/FormInput";
import FormSelect from "../../ui/FormSelect";
import { useOptions } from "./useOptions";
import { useAddOption } from "./useAddOption";
import Row from "../../ui/Row";

function ProductRow({
  numProduct,
  id,
  removeRowHandler,
  duplicateFormHandler,
  register,
  setValue,
  errors,
  nextPaletteNumber,
}) {
  const [width, setWidth] = useState("");
  const [length, setLength] = useState(false);
  const { options, isOptionsLoading } = useOptions();
  const { addOption, isOptionAdding } = useAddOption();

 

  return (
    <Row
      header={`Məhsul ${numProduct} xərcləri`}
      removeRowHandler={removeRowHandler}
      duplicateFormHandler={duplicateFormHandler}
      id={id}
    >
      <FormSelect
        register={register}
        required={true}
        errors={errors}
        id={`product.${id}.name`}
        options={!isOptionsLoading ? options.options : []}
        optionName="productName"
        addOption={addOption}
        isOptionAdding={isOptionAdding}
      >
        Adı
      </FormSelect>
      <FormInput
        register={register}
        required={true}
        errors={errors}
        type="number"
        id={`product.${id}.price`}
        prefix='₼'
      >
        Qiymət (m²)
      </FormInput>
      <FormInput
        register={register}
        required={true}
        errors={errors}
        type="number"
        id={`product.${id}.quantity`}
        prefix='m²'
      >
        Miqdar (m²)
      </FormInput>
      <FormInput
        register={register}
        required={true}
        errors={errors}
        type="text"
        id={`product.${id}.paletteNumber`}
        defaultValue={nextPaletteNumber}
      >
        Palet №
      </FormInput>
      <FormInput
        register={register}
        required={true}
        errors={errors}
        defaultValue={2}
        type="number"
        id={`product.${id}.thickness`}
      >
        Qalınlıq (sm)
      </FormInput>
      <div className="flex basis-[35.8%] flex-col gap-2 px-2">
        <div className="flex justify-between">
          <label className="font-semibold" htmlFor="width">
            En (sm)
          </label>
          <div className="flex gap-2">
            <label className="text-sm font-medium" htmlFor={`widthCheck.${id}`}>
              Sərbəst boy
            </label>
            <input
              id={`widthCheck.${id}`}
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setWidth("Sərbəst boy");
                  setValue(`product.${id}.width`, "Sərbəst boy");
                } else {
                  setValue(`product.${id}.width`, "");
                  setWidth("");
                }
              }}
            />
          </div>
        </div>
        <input
          className="h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md read-only:cursor-not-allowed read-only:bg-slate-50"
          id="width"
          {...register(`product.${id}.width`, { required: true })}
          readOnly={width === "Sərbəst boy"}
        />
        {errors &&
          errors.product &&
          errors?.product.hasOwnProperty([id]) &&
          errors.product[id].width && (
            <span className="text-sm text-red-600">Bu xana vacibdir.</span>
          )}
      </div>
      <div className="flex basis-[35.8%] flex-col gap-2 px-2">
        <div className="flex justify-between">
          <label className="font-semibold" htmlFor="length">
            Uzunluq (sm)
          </label>
          <div className="flex gap-2">
            <label
              className="text-sm font-medium"
              htmlFor={`lengthCheck.${id}`}
            >
              Sərbəst boy
            </label>
            <input
              id={`lengthCheck.${id}`}
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setLength(true);
                  setValue(`product.${id}.length`, "Sərbəst boy");
                } else {
                  setValue(`product.${id}.length`, "");
                  setLength(false);
                }
              }}
            />
          </div>
        </div>
        <input
          className="h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md read-only:cursor-not-allowed read-only:bg-slate-50"
          id="length"
          {...register(`product.${id}.length`, { required: true })}
          readOnly={length}
        />
        {errors.product &&
          errors.product.hasOwnProperty([id]) &&
          errors.product[id].length && (
            <span className="text-sm text-red-600">Bu xana vacibdir.</span>
          )}
      </div>
    </Row>
  );
}

export default ProductRow;
