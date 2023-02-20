import { FiUsers } from "react-icons/fi";
import type { Menu } from "~/helpers/permissions";

export enum PERMISSIONS {
  USERS = "USERS",
}

export const MENU: Menu[] = [
  {
    id: PERMISSIONS.USERS,
    name: "Usuarios",
    icon: FiUsers,
  },
];
