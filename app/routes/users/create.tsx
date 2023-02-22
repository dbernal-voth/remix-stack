import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import {
  getPermissionsFromInputs,
  verifyPermission,
} from "~/helpers/permissions";
import { PERMISSIONS } from "~/constants/permissions";

import { createUser, getUserByEmail } from "~/models/user.server";
import { validateEmail } from "~/helpers/utils";
import { Button, Label, TextInput } from "flowbite-react";
import Page from "~/components/Page";
import PermissionsTable from "~/components/PermissionsTable";

export async function loader({ request }: LoaderArgs) {
  return await verifyPermission(request, PERMISSIONS.USERS, 2);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const permissions = getPermissionsFromInputs(formData);

  if (!validateEmail(email)) {
    return json({ error: "Email is invalid", message: "" }, { status: 400 });
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { error: "Password is required", message: "" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return json(
      { error: "Password is too short", message: "" },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        error: "A user already exists with this email",
        message: "",
      },
      { status: 400 }
    );
  }

  await createUser({ name, email, password, permissions });
  return json({ error: "", message: "User created" }, { status: 201 });
}

export const meta: MetaFunction = () => ({
  title: "Create user",
});
export default function Join() {
  const actionData = useActionData<typeof action>();

  return (
    <Page
      errorMsg={actionData?.error}
      successMsg={actionData?.message}
      title="Create user"
      goBackLink="/users"
    >
      <Form method="post" className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput id="name" placeholder="Eli Logistix" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@email.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            required
            placeholder="********"
          />
        </div>
        <PermissionsTable />
        <hr className="my-2" />
        <Button
          className="bg-primary-500 hover:bg-primary-400 active:bg-primary-600"
          type="submit"
        >
          Create
        </Button>
      </Form>
    </Page>
  );
}
