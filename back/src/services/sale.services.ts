import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserSales = async (userId: number) => {
  const sales = await prisma.sale.findMany({
    where: {
      userId,
    },
  });

  return sales;
};

export default {
  getUserSales,
};
