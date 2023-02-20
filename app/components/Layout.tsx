import NavbarMenu from "./NavbarMenu";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div>
    <NavbarMenu />
    <main className="min-h-screen w-full px-8 py-6">{children}</main>
  </div>
);

export default Layout;
