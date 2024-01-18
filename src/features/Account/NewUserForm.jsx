import { useForm } from "react-hook-form";
import FormInput from "../../ui/FormInput";
import SpinnerMini from "../../ui/SpinnerMini";
import { useSignup } from "../Authentication/useSignup";

function NewUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isSigningup } = useSignup();

  function onSubmit(data) {
    signup(data);
  }

  return (
    <>
      <div className="flex items-center justify-between">
      
          <h1 className="px-24 py-4 text-xl font-bold">Yeni istifadəçi</h1>
        </div>
        <div className="flex justify-center  p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-[90%] flex-col gap-2 rounded-xl bg-slate-50/95 p-12 pb-16 shadow-2xl "
          >
            <h1 className="px-24 py-5 text-center text-xl font-bold">
              Yeni istifadəçi məlumatları
            </h1>

            <div className="mx-8 flex flex-wrap justify-between">
              <FormInput
                errors={errors}
                id={"username"}
                register={register}
                required={true}
                minLength={{ value: 4, message: "Uzunluq minimum 4 olmalıdır" }}
                width={"w-[48%]"}
              >
                İstifadəçi adı
              </FormInput>
              <FormInput
                errors={errors}
                id={"email"}
                register={register}
                required={true}
                width={"w-[48%]"}
                pattern={{
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Yanlış email adresi",
                }}
              >
                Email adresi
              </FormInput>
              <FormInput
                errors={errors}
                id={"password"}
                register={register}
                required={true}
                width={"w-[48%]"}
                type="password"
                minLength={{ value: 6, message: "Uzunluq minimum 6 olmalıdır" }}
              >
                Şifrə
              </FormInput>
              <FormInput
                errors={errors}
                id={"repeatPassword"}
                register={register}
                required={true}
                width={"w-[48%]"}
                type="password"
                minLength={{ value: 6, message: "Uzunluq minimum 6 olmalıdır" }}
                validate={(value, formValues) =>
                  value === formValues.password
                    ? true
                    : "Təkrar şifrə qoyduğunuz şifrə ilə eyni olmalıdır"
                }
              >
                Təkrar şifrə
              </FormInput>
            </div>

            <button
              disabled={isSigningup}
              className="mx-8 mt-3 w-44 self-end rounded-full bg-green-300 px-6 py-4 text-center text-sm font-semibold transition-all duration-150 hover:bg-green-400 hover:text-slate-50"
            >
              {isSigningup ? (
                <span className="flex h-5 items-center justify-center">
                  <SpinnerMini />
                </span>
              ) : (
                "Yeni hesab yarat"
              )}
            </button>
          </form>
        </div>
    </>
  );
}

export default NewUserForm;
