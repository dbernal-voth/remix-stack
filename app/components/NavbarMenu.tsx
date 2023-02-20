import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { Form, NavLink, useSubmit } from "@remix-run/react";
import { useUser } from "~/helpers/utils";

const NavbarMenu = () => {
  const submit = useSubmit();
  const user = useUser();

  const logout = () => submit(null, { method: "post", action: "/logout" });
  return (
    <Navbar fluid className="!bg-primary">
      <Navbar.Brand href="#">
        <img src="/logo.png" className="mr-3 h-6 sm:h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Eli Logistix
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar placeholderInitials={`${user.id}`} rounded>
              <div className="space-y-1 text-white">{user.name}</div>
            </Avatar>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm"># {user.id}</span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logout}>
            <Form action="/logout" method="post">
              Sign out
            </Form>
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle className="ml-2 hover:bg-primary-600" />
      </div>
      <Navbar.Collapse>
        <NavbarItem to="/">Inicio</NavbarItem>
        <NavbarItem to="/">Prospectos</NavbarItem>
        <NavbarItem to="/">Registro</NavbarItem>
        <NavbarItem to="/">Oportunidades</NavbarItem>
        <NavbarItem to="/users">Usuarios</NavbarItem>
      </Navbar.Collapse>
    </Navbar>
  );
};

const NavbarItem: React.FC<{ children: string; to: string }> = ({
  children,
  to,
}) => (
  <Navbar.Link
    to={to}
    className="text-white hover:bg-primary-600 md:hover:text-gray-400"
    as={NavLink}
  >
    {children}
  </Navbar.Link>
);

export default NavbarMenu;
