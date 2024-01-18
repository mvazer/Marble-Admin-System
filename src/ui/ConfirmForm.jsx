import { useRef } from "react";
import { createPortal } from "react-dom";
import Spinner from "./Spinner";
import SpinnerMini from "./SpinnerMini";

function ConfirmForm({ setToggle, loading = false, submitHandler, children }) {
  const ModalRef = useRef();

  return createPortal(
    <div
      ref={ModalRef}
      onMouseDown={(e) => e.target == ModalRef.current && setToggle("")}
      className="fixed left-0 top-0 z-10 h-[100vh] w-full backdrop-blur-sm transition-all duration-200"
    >
      <div className="fixed left-[50%] top-[50%] block w-full translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-3xl bg-slate-50/95 px-16 pb-10 pt-14 shadow-2xl transition-all duration-200 md:w-[60%] lg:w-[35%]">
        <button
          onClick={() => setToggle("")}
          className="absolute right-3 top-2 p-2 text-2xl"
        >
          &#10005;
        </button>
        {loading ? (
          <Spinner />
        ) : (
          <div className="mt-8 flex flex-col ">
            <span className="mb-10 text-center text-lg font-semibold">
              {children}
            </span>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setToggle("")}
                className="rounded-xl bg-slate-700/90 px-4 py-1 font-semibold text-slate-100 hover:bg-slate-800 disabled:bg-slate-800/70"
              >
                Ləğv et
              </button>
              {loading ? (
                <SpinnerMini />
              ) : (
                <button
                  onClick={submitHandler}
                  className="rounded-xl bg-red-700/90 px-6 py-1 font-semibold text-slate-100 hover:bg-red-800 disabled:bg-red-700/70"
                >
                  Təsdiqlə
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

export default ConfirmForm;
