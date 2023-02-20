import type { TextareaProps } from "flowbite-react";
import { Textarea as TextareaUI, Label } from "flowbite-react";

interface IProps extends TextareaProps {
  label?: string;
  name: string;
  rows?: number;
}

const Textarea: React.FC<IProps> = ({ label, name, rows, ...extraProps }) => (
  <div className="my-2">
    {label && (
      <div className="mb-1 block">
        <Label htmlFor={name}>{label}</Label>
      </div>
    )}
    <div className="relative w-full">
      <TextareaUI
        className="mb-4"
        id={name}
        name={name}
        rows={rows || 4}
        {...extraProps}
      />
    </div>
  </div>
);

export default Textarea;
