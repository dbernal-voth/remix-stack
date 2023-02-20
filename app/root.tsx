import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import { getUser, getUserId } from "./session.server";

import Layout from "./components/Layout";
import Error401 from "./components/Error401";
import Error404 from "./components/Error404";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import loaderStylesheetUrl from "./styles/loader.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    {
      rel: "stylesheet",
      href: loaderStylesheetUrl,
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Eli Logistix",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  const { pathname } = new URL(request.url);
  if (!userId && pathname !== "/login") {
    if (pathname === "/" || pathname === "/logout") return redirect("/login");
    return redirect(`/login?redirectTo=${pathname}`);
  }
  return json({
    user: await getUser(request),
  });
}

const BaseComponent: React.FC<{
  withLayout: boolean;
  children: React.ReactNode;
}> = ({ withLayout, children }) => {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full" id="body" style={{ backgroundColor: "#f1f5fa" }}>
        {withLayout ? <Layout>{children}</Layout> : children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <div id="modal-root" />
      </body>
    </html>
  );
};

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <BaseComponent withLayout={!!user}>
      <Outlet />
    </BaseComponent>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  console.log(caught);

  if (caught.status === 401 || caught.status === 404) {
    return (
      <BaseComponent withLayout={false}>
        {caught.status === 401 ? <Error401 /> : <Error404 />}
      </BaseComponent>
    );
  }
  return (
    <BaseComponent withLayout={false}>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </BaseComponent>
  );
}
