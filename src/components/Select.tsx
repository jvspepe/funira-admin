import { ComponentPropsWithRef, forwardRef } from "react";

type SelectProps = Omit<ComponentPropsWithRef<"select">, "className" | "id"> & {
  label: string;
  id: string;
};

export default forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, id, ...props },
  ref,
) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="w-fit">
        {label}
      </label>
      <select id={id} ref={ref} {...props} className="rounded border p-2">
        {props.children}
      </select>
    </div>
  );
});
