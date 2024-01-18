import { useForm } from "react-hook-form";
import FormInput from "../../ui/FormInput";
import { useSignup } from "../Authentication/useSignup";
import SpinnerMini from "../../ui/SpinnerMini";
import { HiChevronDown } from "react-icons/hi2";
import { useState } from "react";
import { useUser } from "../Authentication/useUser";
import Spinner from "../../ui/Spinner";
import { useUpdateUser } from "../Authentication/useUpdateUser";

function UpdateUserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { updateUser, isUpdatingUser } = useUpdateUser();
  const { user, isUserLoading } = useUser();

  function onSubmit(data) {
    updateUser(
      { ...data, email: user.user.email },
      { onSuccess: () => reset() },
    );
  }
  if (isUserLoading) return <Spinner />;

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="px-24 py-4 text-xl font-bold">
          İstifadəçi məlumatlarını yenilə
        </h1>
      </div>

      <div className="flex justify-center  p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-[90%] flex-col gap-2 rounded-xl bg-slate-50/95 p-12 pb-16 shadow-2xl "
        >
          <h1 className="px-24 py-5 text-center text-xl font-bold">
            istifadəçi məlumatları
          </h1>

          <div className="mx-8 flex flex-wrap justify-between">
            <FormInput
              errors={errors}
              id={"username"}
              register={register}
              required={true}
              width={"w-[48%]"}
              defaultValue={
                user.user.user_metadata.hasOwnProperty("username")
                  ? user.user.user_metadata.username
                  : ""
              }
              minLength={{ value: 4, message: "Uzunluq minimum 4 olmalıdır" }}
            >
              İstifadəçi adı
            </FormInput>
            <div className={`flex w-[48%] flex-col gap-2 px-2 `}>
              <label className="flex items-center justify-between font-semibold">
                Email adresi
              </label>
              <span className="h-10 cursor-not-allowed rounded-md border border-slate-700 bg-slate-200/70  px-3 py-1 shadow-md ">
                {user.user.email}
              </span>
            </div>
            <FormInput
              errors={errors}
              id={"password"}
              register={register}
              required={true}
              width={"w-[48%]"}
              type="password"
              minLength={{ value: 6, message: "Uzunluq minimum 6 olmalıdır" }}
            >
              Yeni Şifrə
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
              Təkrar yeni şifrə
            </FormInput>
          </div>

          <button
            disabled={isUpdatingUser}
            className="mx-8 mt-3 w-44 self-end rounded-full bg-green-300 px-6 py-4 text-center text-sm font-semibold transition-all duration-150 hover:bg-green-400 hover:text-slate-50"
          >
            {isUpdatingUser ? (
              <span className="flex h-5 items-center justify-center">
                <SpinnerMini />
              </span>
            ) : (
              "Hesabı yenilə"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateUserForm;
