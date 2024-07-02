import { forwardRef } from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

type TextareaProps = Omit<TextareaAutosizeProps, "className" | "id"> & {
  label: string;
  id: string;
};

export default forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, id, ...props },
  ref,
) {
  return (
    <div className="grid gap-1">
      <label htmlFor={id} className="w-fit">
        {label}
      </label>
      <TextareaAutosize
        id={id}
        ref={ref}
        {...props}
        className="rounded border p-2"
      />
    </div>
  );
});
