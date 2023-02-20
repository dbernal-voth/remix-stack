import { Form, Link, useTransition } from "@remix-run/react";
import { Alert, Button } from "flowbite-react";
import { RiSearchLine } from "react-icons/ri";
import { HiOutlineChevronLeft /* HiDotsVertical */ } from "react-icons/hi";

import type { Row } from "~/components/Table";
import PrimaryButton from "~/components/PrimaryButton";
import Table from "~/components/Table";
import Input from "~/components/Input";
import Loader from "~/components/Loader";

interface IProps {
  goBackLink?: string;
  title: string;
  createButton?: {
    link: string;
    text: string;
  };
  head: string[];
  rows: Row[] | undefined;
  searchPlaceHolder?: string;
  extra?: React.ReactNode;
}

const SearchForm: React.FC<IProps> = ({
  goBackLink,
  title,
  createButton,
  searchPlaceHolder,
  head,
  rows,
  extra,
}) => {
  const transition = useTransition();
  /* const [enabledFilters, setEnabledFilters] = useState(false);
  const toggleFilters = () => setEnabledFilters((state) => !state); */
  return (
    <div>
      {!!transition.submission && <Loader />}
      <div className="flex items-center">
        {goBackLink && (
          <Link to={goBackLink} className="mr-4">
            <Button color="light" size="xs">
              <HiOutlineChevronLeft className="text-xl text-gray-500" />
            </Button>
          </Link>
        )}
        <h1 className="text-3xl">{title}</h1>
      </div>
      <hr className="my-4" />
      <div className="mb-4 mt-2 flex flex-wrap items-center justify-between">
        <Form method="post">
          <div className="flex items-center">
            <Input
              Icon={RiSearchLine}
              id="search"
              name="search"
              placeholder={searchPlaceHolder || "Escribe la búsqueda aquí"}
              width="w-80"
              noSpace
              disabled={!!transition.submission}
            />
            <Button
              color="light"
              className="-ml-3 hidden md:block"
              type="submit"
              disabled={!!transition.submission}
            >
              Buscar
            </Button>
            {/* <Button className="ml-1 w-6" color="light" onClick={toggleFilters}>
              <HiDotsVertical />
            </Button> */}
          </div>
        </Form>
        <div className="flex content-center items-center">
          {extra && <div className="mr-2">{extra}</div>}
          {createButton && (
            <Link to={createButton.link} className="mt-2 md:mt-0">
              <PrimaryButton>{createButton.text}</PrimaryButton>
            </Link>
          )}
        </div>
      </div>
      {/* {rows?.length === 500 && (
        <small className="text-red-600">
          Búsqueda limitada a <b>500</b> resultados
        </small>
      )} */}
      <Table enumerated head={head} rows={rows} />
      {rows?.length === 0 && (
        <Alert color="failure" className="mt-2">
          No se han encontrado resultados
        </Alert>
      )}
    </div>
  );
};

export default SearchForm;
