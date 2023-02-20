import { Form as RemixForm } from "@remix-run/react";
import PrimaryButton from "~/components/PrimaryButton";

interface IProps {
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  disabled?: boolean;
  children: React.ReactNode;
  buttonName: string;
  className?: string;
}

const Form: React.FC<IProps> = ({
  onSubmit,
  disabled,
  children,
  buttonName,
  className,
}) => (
  <RemixForm method="post" onSubmit={onSubmit} className={className}>
    {children}
    <hr className="my-4" />
    {!disabled && (
      <PrimaryButton type="submit" size="sm" fullSized>
        {buttonName}
      </PrimaryButton>
    )}
  </RemixForm>
);

export default Form;
