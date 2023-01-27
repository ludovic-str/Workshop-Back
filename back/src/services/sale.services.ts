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

const createSale = async (userId: number, amount: number, name: string) => {
  const sale = await prisma.sale.create({
    data: {
      userId,
      amount,
      name,
    },
  });

  return sale;
};

export default {
  getUserSales,
  createSale,
};
