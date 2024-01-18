import { useForm } from "react-hook-form";
import FormInput from "../../ui/FormInput";

function NewCustomerForm({ onClose }) {
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 px-4 pb-8">
        <h1 className="px-24 pt-6 text-center text-xl font-semibold uppercase">
          Müştəri məlumatları
        </h1>
        <div className="flex flex-wrap justify-between gap-4 ">
          <FormInput required={true} register={register} id={"name"}>
            Müştəri adı
          </FormInput>
          <FormInput
            register={register}
            required={true}
            errors={errors}
            type="number"
            id={"shippingCost"}
          >
            Əlaqə nömrəsi
          </FormInput>
          <FormInput
            register={register}
            required={true}
            errors={errors}
            type="number"
            id={"customCost"}
          >
            Gömrük xərci
          </FormInput>
          <FormInput
            register={register}
            required={true}
            errors={errors}
            type="number"
            id={"extraCosts"}
          >
            Əlavə xərclər
          </FormInput>
        </div>
      </div>
    </form>
  );
}

export default NewCustomerForm;
