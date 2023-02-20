import type { ButtonProps } from "flowbite-react";
import { Button } from "flowbite-react";

const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => (
  <Button
    className={`bg-primary-500 hover:bg-primary-400 active:bg-primary-600 ${
      className || ""
    }`}
    type="submit"
    {...props}
  >
    {children}
  </Button>
);

export default PrimaryButton;
