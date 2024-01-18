import { useEffect, useState } from "react";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";
import Spinner from "../../ui/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: { message: "", state: ["empty"] },
    password: { message: "", state: ["empty", "min"], value: 6 },
  });
  const [submitted, setSubmitted] = useState(false);

  const { login, isLoggingin } = useLogin();
  const { user, isUserLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoading && user.user ) navigate("/dashboard");
  }, [user, navigate, isUserLoading]);

  if (isUserLoading) return <Spinner />;

  function loginHandler(e) {
    e.preventDefault();
    setSubmitted(true);
    if (!email.length > 0)
      setError((e) => ({
        ...e,
        email: { ...e.email, message: "Bu xana vacibdir" },
      }));
    if (!password.length > 0)
      setError((e) => ({
        ...e,
        password: { ...e.password, message: "Bu xana vacibdir" },
      }));
    else if (password.length < error.password.value)
      setError((e) => ({
        ...e,
        password: {
          ...e.password,
          message: `Minimum uzunluq ${error.password.value} olmalıdır`,
        },
      }));

    if (!email.length > 0 && password.length < error.password.value) return;

    login({ email, password });
  }

  function changeHandler(e, set, value) {
    set(e.target.value);
    if (!submitted) return;

    if (
      error[value].state.some((cur) => cur === "empty") &&
      e.target.value.length > 0
    ) {
      setError((e) => ({ ...e, [value]: { ...e[value], message: "" } }));
    } else if (
      error[value].state.some((cur) => cur === "empty") &&
      !e.target.value.length > 0
    ) {
      setError((e) => ({
        ...e,
        [value]: { ...e[value], message: "Bu xana vacibdir" },
      }));
      return;
    }

    if (
      error[value].state.some((cur) => cur === "min") &&
      e.target.value.length >= error[value].value
    ) {
      setError((e) => ({ ...e, [value]: { ...e[value], message: "" } }));
    } else if (
      error[value].state.some((cur) => cur === "min") &&
      e.target.value.length < error[value].value
    )
      setError((e) => ({
        ...e,
        [value]: { ...e[value], message: "Minimum uzunluq 6 olmalıdır" },
      }));
  }

  return (
    <div className="flex h-screen   items-center justify-center">
      <form onSubmit={loginHandler} className="flex w-full md:w-[70%] lg:w-[30%] flex-col gap-6 rounded-xl bg-slate-50/95 p-12 pb-16 shadow-2xl ">
        <h1 className="px-24 py-3 text-center text-xl font-bold">Daxil ol</h1>

        <div className="flex flex-col gap-2 px-2">
          <label
            className="flex items-center justify-between font-semibold"
            htmlFor="email"
          >
            Mail
          </label>
          <input
            className="h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md "
            id="email"
            value={email}
            onChange={(e) => changeHandler(e, setEmail, "email")}
          ></input>
          {error.hasOwnProperty("email") && error.email.message.length > 0 && (
            <span className="text-sm text-red-600">{error.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 px-2">
          <label
            className="flex items-center justify-between font-semibold"
            htmlFor="password"
          >
            Şifrə
          </label>
          <input
            className="h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md "
            id="password"
            type="password"
            value={password}
            onChange={(e) => changeHandler(e, setPassword, "password")}
          ></input>
          {error.hasOwnProperty("password") &&
            error.password.message.length > 0 && (
              <span className="text-sm text-red-600">
                {error.password.message}
              </span>
            )}
        </div>
        <button
          disabled={isLoggingin}
          className="mt-6 self-end rounded-full bg-green-300 px-6 py-3 text-center text-sm font-semibold transition-all duration-150 hover:bg-green-400 hover:text-slate-100"
        >
          {isLoggingin ? "Yüklənir..." : "Daxil ol"}
        </button>
      </form>
    </div>
  );
}

export default Login;
