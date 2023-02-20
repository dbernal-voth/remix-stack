import { Radio, Table } from "flowbite-react";
import { MENU } from "~/helpers/permissions";

interface IProps {
  permissions?: Array<[string, number]>;
}

const PermissionsTable: React.FC<IProps> = ({ permissions }) => {
  const getIfIsChecked = (permission: string, level = 0) => {
    if (!permissions) return false;
    if (!Array.isArray(permissions)) return false;
    const found = permissions.find(
      (p) => p[0] === permission && p[1] === level
    );
    return !!found;
  };

  return (
    <>
      <hr className="my-2" />
      <h1 className="text-xl text-gray-600">Permissions</h1>
      <Table>
        <Table.Head>
          <Table.HeadCell>Permission name</Table.HeadCell>
          <Table.HeadCell>No permission</Table.HeadCell>
          <Table.HeadCell>Read only</Table.HeadCell>
          <Table.HeadCell>Read and write</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {MENU.map((permission) => (
            <Table.Row key={permission.id}>
              <Table.Cell>{permission.name.toUpperCase()}</Table.Cell>
              <Table.Cell>
                <Radio
                  name={`P-${permission.id}`}
                  defaultChecked={getIfIsChecked(permission.id) || true}
                  className="checked:bg-primary-500 focus:ring-primary-600"
                />
              </Table.Cell>
              <Table.Cell>
                <Radio
                  name={`P-${permission.id}`}
                  value="1"
                  defaultChecked={getIfIsChecked(permission.id, 1)}
                  className="checked:bg-primary-500 focus:ring-primary-600"
                />
              </Table.Cell>
              <Table.Cell>
                <Radio
                  name={`P-${permission.id}`}
                  value="2"
                  defaultChecked={getIfIsChecked(permission.id, 2)}
                  className="checked:bg-primary-500 focus:ring-primary-600"
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default PermissionsTable;
