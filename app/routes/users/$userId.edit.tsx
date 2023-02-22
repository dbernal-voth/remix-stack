import type {
  ActionArgs,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/server-runtime";
import { useActionData, useLoaderData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Alert } from "flowbite-react";
import type { User } from "~/models/user.server";
import { getUserById, updateUser, disableUser } from "~/models/user.server";
import { errorResp, successfulResp } from "~/helpers/responses";
import type { Permission } from "~/helpers/permissions";
import {
  getPermissionsFromInputs, 
  verifyPermission,
} from "~/helpers/permissions";
import { PERMISSIONS } from '~/constants/permissions'

import Page from "~/components/Page";
import UserForm from "~/components/Forms/UserForm";

export async function loader({ params, request }: LoaderArgs) {
  const { userId } = params;
  invariant(userId, "Missing userId");
  await verifyPermission(request, PERMISSIONS.USERS, 2);

  const url = new URL(request.url);
  const isDisable = url.searchParams.get("disable");
  if (isDisable) {
    await disableUser(parseInt(userId), 1);
    return redirect(`/users`);
  }

  const user = await getUserById(parseInt(userId));
  if (!user) {
    throw new Response("Not found", { status: 404 });
  }
  type UserWithPermissions = Omit<User, "permissions"> & {
    permissions: Permission[];
  };
  return json({ user: user as UserWithPermissions });
}

export async function action({ request, params }: ActionArgs) {
  const { userId } = params;
  invariant(userId, "Missing userId");

  await verifyPermission(request, PERMISSIONS.USERS, 2);

  const formData = await request.formData();
  const name = formData.get("name") as string;
  const permissions = getPermissionsFromInputs(formData);

  try {
    await updateUser(parseInt(userId), {
      name,
      permissions,
    });
    return successfulResp("Usuario actualizado correctamente");
  } catch (err: any) {
    console.error(err.message);
    return errorResp();
  }
}

export const meta: MetaFunction = () => ({
  title: "Edit user",
});
export default function EditUser() {
  const resp = useActionData<typeof action>();
  const { user } = useLoaderData<typeof loader>();
  /* 
  const [isShowModal, setIsShowModal] = React.useState(false);
  const toggleModal = () => setIsShowModal((state) => !state); */

  return (
    <Page
      errorMsg={resp?.error}
      successMsg={resp?.message}
      title="Edit user"
      goBackLink="/users"
    >
      {user.disabledAt && (
        <Alert color="warning">This user account is disabled.</Alert>
      )}
      <UserForm
        defaultValues={{
          name: user.name,
          email: user.email,
          permissions: user.permissions,
        }}
        disabled={!!user.disabledAt}
      />
      {/* {!user.disabledAt && (
        <DisableUser toggleModal={toggleModal} isShowModal={isShowModal} />
      )} */}
    </Page>
  );
}
