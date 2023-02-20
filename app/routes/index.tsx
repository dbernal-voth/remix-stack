import type { LoaderArgs } from "@remix-run/node";
import { getUser } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const user = await getUser(request);
  return user;
}

export default function Index() {
  return (
    <>
      <h1>Bienvenido</h1>
    </>
  );
}
