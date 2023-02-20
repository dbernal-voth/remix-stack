import { Link as LinkRemix } from "@remix-run/react";
import { Button } from "flowbite-react";

interface IProps {
  children: string;
  to: string;
  color: string;
}

const LinkButton: React.FC<IProps> = ({ children, to, color }) => (
  <LinkRemix to={to} className="mr-2">
    <Button color={color}>{children}</Button>
  </LinkRemix>
);

export default LinkButton;
