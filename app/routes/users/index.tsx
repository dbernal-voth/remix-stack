import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { verifyPermission } from "~/helpers/permissions";
import { PERMISSIONS } from '~/constants/permissions'
import { searchUsers } from "~/models/user.server";
import { formatDate } from "~/helpers/format";
import SearchForm from "~/components/Forms/SearchForm";

export async function loader({ request }: LoaderArgs) {
  return await verifyPermission(request, PERMISSIONS.USERS, 1);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const search = formData.get("search");
  if (typeof search !== "string") return json({ users: [] });
  const users = await searchUsers(search);
  return json({ users });
}

export const meta: MetaFunction = () => ({ title: "Users" });
export default function Users() {
  const data = useActionData<typeof action>();
  return (
    <SearchForm
      title="Usuarios"
      createButton={{
        link: "/users/create",
        text: "Crear usuario",
      }}
      searchPlaceHolder="Escribe el usuario o nombre"
      head={[
        "ID",
        "Nombre de usuario",
        "Nombre",
        "Ultima edición",
        "Último accesso",
        "Acciones",
      ]}
      rows={data?.users?.map((user) => [
        user.id,
        user.email,
        user.name,
        formatDate(user.updatedAt),
        formatDate(user.loggedAt),
        <Link
          key={user.id}
          to={`/users/${user.id}/edit`}
          className="ml-4 font-medium text-primary-400 hover:underline"
        >
          Editar
        </Link>,
      ])}
    />
  );
}
