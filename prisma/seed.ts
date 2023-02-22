import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { MENU } from "~/constants/permissions";

const prisma = new PrismaClient();

async function seed() {
  await createDefaultUsers();
  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

async function createDefaultUsers() {
  const name = "admin";
  const email = "admin@vothsolutions.com";
  const password = "asdf1234";
  const permissions = MENU.map((menu) => [menu.id, 2]);

  await prisma.user.delete({ where: { email } }).catch(() => {});
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      permissions,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
  console.log(`- Default user created. 👤`);
}
