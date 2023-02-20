import type { AlertColors } from "flowbite-react";
import { Link } from "@remix-run/react";
import { Alert, Button } from "flowbite-react";
import { RiCheckLine, RiCloseCircleLine } from "react-icons/ri";
import { HiOutlineChevronLeft } from "react-icons/hi";
import React, { useEffect } from "react";

interface IProps {
  errorMsg?: string;
  successMsg?: string;
  goBackLink?: string;
  title?: string;
  children: React.ReactNode;
}

const MyAlert: React.FC<{
  children: React.ReactNode;
  color: keyof AlertColors;
}> = ({ children, color }) => {
  useEffect(() => {
    const element = document.getElementById("body");
    if (!element) return console.error("not found", element);
    element.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Alert color={color} className="my-2">
      <span className="flex	items-center">{children}</span>
    </Alert>
  );
};

const Page: React.FC<IProps> = ({
  errorMsg,
  successMsg,
  goBackLink,
  title,
  children,
}) => (
  <div>
    <div className="flex items-center">
      {goBackLink && (
        <Link to={goBackLink} className="mr-4">
          <Button color="light" size="xs">
            <HiOutlineChevronLeft className="text-xl text-gray-500" />
          </Button>
        </Link>
      )}
      {title && <h1 className="text-3xl font-medium">{title}</h1>}
    </div>
    <hr className="my-4" />
    {errorMsg && (
      <MyAlert color="failure">
        <RiCloseCircleLine className="mr-2 text-xl" />
        {errorMsg}
      </MyAlert>
    )}
    {successMsg && (
      <MyAlert color="success">
        <RiCheckLine className="mr-2 text-xl" />
        {successMsg}
      </MyAlert>
    )}
    {children}
  </div>
);

export default Page;
