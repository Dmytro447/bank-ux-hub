import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


async function main() {
  const cat = await prisma.category.upsert({
    where: { name: "KYC" },
    update: {},
    create: { name: "KYC" },
  });
  await prisma.uXPattern.create({
    data: {
      title: "Monobank Onboarding",
      description: "BankID flow with 2FA",
      platform: "IOS",
      categoryId: cat.id,
      screenshots: ["https://…/monobank1.png"],
    },
  });
}
main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
