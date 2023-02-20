import { Label, Select } from "flowbite-react";
import React from "react";

interface IProps {
  label: string;
  name: string;
  options: [string | number, string][];
  disabled?: boolean;
  required?: boolean;
}

const InputSelect: React.FC<IProps> = ({
  label,
  name,
  options,
  disabled,
  required = true,
}) => (
  <div className="my-2">
    <div className="mb-2 block">
      <Label htmlFor={name}>{label}</Label>
    </div>
    <Select id={name} name={name} disabled={disabled} required={required}>
      <option />
      {options.map(([value, name]) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </Select>
  </div>
);

export default InputSelect;
