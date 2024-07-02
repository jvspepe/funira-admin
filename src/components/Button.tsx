import { ElementType } from "react";

export type Props<T extends ElementType> = {
  component?: T;
};

const Button = <T extends ElementType = "button">({
  component,
  ...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) => {
  const Component = component || "button";
  return (
    <Component
      {...props}
      className="mx-auto rounded bg-gray-900 p-2 text-gray-50 disabled:cursor-not-allowed disabled:bg-opacity-50"
    >
      {props.disabled ? (
        <span className="block h-4 w-4 animate-spin rounded-full border border-white border-t-black" />
      ) : (
        props.children
      )}
    </Component>
  );
};

export default Button;
