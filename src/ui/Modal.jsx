import {
  cloneElement,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal, setOpenModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Button({ children }) {
  const { setOpenModal } = useContext(ModalContext);
  return (
    <button
      onClick={() => setOpenModal(true)}
      className="hidden mx-24 mt-6 rounded-lg bg-slate-800 px-4 py-2 text-center text-sm font-medium text-slate-50 transition-all duration-150 hover:bg-slate-600 md:block"
    >
      {children}
    </button>
  );
}

function Form({ children }) {
  const { openModal, setOpenModal } = useContext(ModalContext);
  const ref = useRef();
  if (!openModal) return;
  return createPortal(
    <div
      onMouseDown={(e) => {
        e.target === ref.current && setOpenModal(false);
      }}
      className="fixed left-0 top-0 h-[100vh] w-full backdrop-blur-sm transition-all duration-200"
      ref={ref}
    >
      <div className="fixed left-[50%] top-[50%] block h-[90%] w-[70%] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-3xl bg-slate-50/95  p-8 shadow-2xl transition-all duration-200">
        <button
          onClick={() => setOpenModal(false)}
          className="absolute right-3 top-2 p-2 text-2xl"
        >
          &#10005;
        </button>
        {children &&
          cloneElement(children, {
            ...children.props,
            onClose: () => setOpenModal(false),
          })}
      </div>
    </div>,
    document.body,
  );
}

Modal.Button = Button;
Modal.Form = Form;

export default Modal;
