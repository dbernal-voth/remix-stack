import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

type UserCreationAttr = Pick<User, "name" | "email" | "permissions"> & {
  password: string;
};

type UserUpdateAttr = Partial<Pick<User, "name" | "permissions">>;

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser({
  email,
  name,
  permissions,
  password,
}: UserCreationAttr) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      name,
      permissions,
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) return null;

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) return null;

  await prisma.user.update({
    where: { email },
    data: {
      loggedAt: new Date(),
      updatedAt: userWithPassword.updatedAt,
    },
  });

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function updateUser(
  userId: User["id"],
  { name, permissions }: UserUpdateAttr
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      ...(name && { name }),
      ...(permissions && { permissions }),
    },
  });
}

export async function searchUsers(searchText: string) {
  return prisma.user.findMany({
    where: {
      OR: [
        {
          email: {
            contains: searchText,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: searchText,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}

export async function disableUser(userId: User["id"], disabledBy: User["id"]) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      disabledBy,
      disabledAt: new Date(),
    },
  });
}
