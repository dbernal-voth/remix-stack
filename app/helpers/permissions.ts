import type { Prisma } from "@prisma/client";
import type { PERMISSIONS } from "~/constants/permissions";
import { MENU } from "~/constants/permissions";
import { requireUser } from "~/session.server";

import type { IconType } from "react-icons";
export interface Menu {
  readonly id: PERMISSIONS;
  readonly name: string;
  readonly icon: IconType;
}

export type PermissionLevel = 0 | 1 | 2;
export type Permission = [PERMISSIONS, PermissionLevel];

export function getPermissionInfo(id: PERMISSIONS) {
  return MENU.find((p) => p.id === id);
}

export function getPermissionsFromInputs(formData: FormData): Permission[] {
  const getPermissions = (formData: FormData): Permission[] => {
    const parsePermission = (permission: string) => {
      return parseInt(permission) as PermissionLevel;
    };
    return MENU.map((m) => {
      const permission = formData.get(`P-${m.id}`) as string;
      return [m.id, parsePermission(permission)];
    });
  };

  let permissions = getPermissions(formData);

  permissions = permissions.filter(([_name, level]) => level > 0);

  const sorted = permissions.sort((a, b) => {
    const nameA = getPermissionInfo(a[0])?.name;
    const nameB = getPermissionInfo(b[0])?.name;
    if (!nameA || !nameB) return 0;
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  });
  return sorted;
}

export function hasPermission(
  userPermissions: Permission[] | Prisma.JsonValue[],
  required: PERMISSIONS,
  minLevel: PermissionLevel
) {
  const found = userPermissions.find(
    ([name, level]: any) => name === required && level >= minLevel
  );
  return !!found;
}

export async function verifyPermission(
  request: Request,
  required: Parameters<typeof hasPermission>[1],
  minLevel: Parameters<typeof hasPermission>[2]
) {
  const user = await requireUser(request);
  if (!hasPermission(user.permissions, required, minLevel)) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return null;
}
