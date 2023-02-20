import type { Permission } from "~/helpers/permissions";
import PermissionsTable from "~/components/PermissionsTable";
import Input from "~/components/Input";
import Form from "./Form";

interface IProps {
  defaultValues?: {
    name: string;
    email: string;
    permissions: Permission[];
  };
  disabled?: boolean;
}
const UserForm: React.FC<IProps> = ({ defaultValues, disabled }) => (
  <Form
    className="flex flex-col gap-4"
    buttonName={defaultValues ? "Save" : "Create"}
    disabled={disabled}
  >
    <Input
      label="Name"
      name="name"
      placeholder="Eli Logistix"
      defaultValue={defaultValues?.name}
      required
    />
    <Input
      label="Email"
      type="email"
      name="email"
      placeholder="name@email.com"
      defaultValue={defaultValues?.email}
      required
    />
    {!defaultValues && (
      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="********"
        required
      />
    )}
    <PermissionsTable permissions={defaultValues?.permissions} />
  </Form>
);

export default UserForm;
