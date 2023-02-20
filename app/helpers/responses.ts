import { json } from "@remix-run/node";

export function errorResp(msg?: string) {
  return json(
    { error: msg || "Ha ocurrido un error", message: "" },
    { status: 400 }
  );
}

export function badRequest(msg?: string) {
  return json(
    { error: msg || "Ha ocurrido un error", message: "" },
    { status: 400 }
  );
}

export function successfulResp(msg: string, extraResponse?: object) {
  return json({ error: "", message: msg, ...extraResponse }, { status: 201 });
}
