import {
  type ComponentPropsWithoutRef,
  type FormEvent,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";

export type FormHandleProps = {
  clear: () => void;
};

type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};

export default forwardRef<FormHandleProps, FormProps>(function Form(
  { onSave, children, ...otherProps },
  ref
) {
  const form = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => {
    return {
      clear() {
        form.current?.reset();
      },
    };
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }

  return (
    <form onSubmit={handleSubmit} {...otherProps} ref={form}>
      {children}
    </form>
  );
});
