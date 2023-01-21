import { PrismaClient } from "@prisma/client";
import { ProductRequestBody } from "../types/body/productRequestBody.types";

const prisma = new PrismaClient();

const getAllProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

const createProduct = async (product: ProductRequestBody) => {
  const newProduct = await prisma.product.create({
    data: {
      name: product.name,
      price: product.price,
      priceSale: product.priceSale,
      color: product.color,
      status: product.status,
      user: {
        connect: {
          id: parseInt(product.userId),
        },
      },
    },
  });

  return newProduct;
};

export default {
  getAllProducts,
  createProduct,
};
