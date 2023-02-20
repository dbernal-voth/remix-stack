/* import type { ComponentProps } from "react";
import type { IconType } from "react-icons/lib";
import { Label } from "flowbite-react";

interface IProps extends ComponentProps<"input"> {
  label?: string;
  Icon?: IconType;
  noSpace?: boolean;
  width?: string;
}

const baseClassName =
  "w-full block rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-orange-500 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50";

const Input: React.FC<IProps> = ({
  name,
  label,
  noSpace,
  Icon,
  type,
  className,
  width,
  ...extraProps
}) => (
  <div className={`${width || "w-full"} ${noSpace ? "" : "my-2"}`}>
    {label && (
      <div className="mb-1 block">
        <Label htmlFor={name}>{label}</Label>
      </div>
    )}
    <div className="relative w-full">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
      )}
      <input
        type={type || "text"}
        id={name}
        name={name}
        className={`${baseClassName} ${Icon ? "pl-10" : ""} ${className || ""}`}
        {...extraProps}
      />
    </div>
  </div>
);

export default Input;
 */

import { Label, TextInput } from "flowbite-react";
import type { TextInputProps } from "flowbite-react";
import type { IconType } from "react-icons/lib";

interface IProps extends TextInputProps {
  label?: string;
  Icon?: IconType;
  noSpace?: boolean;
  width?: string;
}

/* <div className={`${width || "w-full"} ${noSpace ? "" : "mb-2"}`}> */
const Input: React.FC<IProps> = ({
  name,
  label,
  noSpace,
  Icon,
  type,
  className,
  width,
  ...extraProps
}) => (
  <div className={width || "w-full"}>
    {label && (
      <div className="mb-2 block">
        <Label htmlFor={`input-${name}`} value={label} />
      </div>
    )}
    <TextInput
      type={type || "text"}
      icon={Icon}
      id={`input-${name}`}
      name={name}
      className={className}
      {...extraProps}
    />
  </div>
);
export default Input;
