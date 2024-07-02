import { ComponentPropsWithRef, forwardRef } from "react";

type TextInputProps = Omit<
  ComponentPropsWithRef<"input">,
  "className" | "id"
> & {
  label: string;
  id: string;
};

export default forwardRef<HTMLInputElement, TextInputProps>(function Input(
  { label, id, ...props },
  ref,
) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="w-fit">
        {label}
      </label>
      <input id={id} ref={ref} {...props} className="rounded border p-2" />
    </div>
  );
});
