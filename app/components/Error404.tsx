import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Error404 = () => (
  <div className="flex h-full flex-col items-center justify-center">
    <h1 className="text-9xl font-bold text-primary">404</h1>
    <h2 className="mb-2 text-4xl font-bold">Algo ha salido mal</h2>
    <p className="mb-4 text-xl">
      No se ha encontrado la página a la que intentas entrar
    </p>
    <Link to="/">
      <Button color="light">Regresar</Button>
    </Link>
  </div>
);

export default Error404;
