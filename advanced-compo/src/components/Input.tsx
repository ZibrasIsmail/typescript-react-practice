import { ComponentPropsWithoutRef, forwardRef } from "react";

type InputProps = {
  id: string;
  label: string;
} & ComponentPropsWithoutRef<"input">;

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, ...props }: InputProps,
  ref
) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} ref={ref} />
    </p>
  );
});
