import { Link as LinkRemix } from "@remix-run/react";

interface IProps {
  children: string;
  to: string;
}

const Link: React.FC<IProps> = ({ children, to }) => (
  <LinkRemix
    to={to}
    className="ml-4 font-medium text-primary-600 hover:underline"
  >
    {children}
  </LinkRemix>
);

export default Link;
