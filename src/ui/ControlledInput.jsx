function ControlledInput({ children, id, type = "text", required = false, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 px-2">
      <label
        className="flex items-center justify-between font-semibold"
        htmlFor={id}
      >
        <span>{children}</span>
      </label>

      <input
        className="h-10 rounded-md border border-slate-700 bg-transparent px-3 py-1 shadow-md"
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
      {required && (
        <span className="text-sm text-red-600">Bu xana vacibdir.</span>
      )}
    </div>
  );
}

export default ControlledInput;
