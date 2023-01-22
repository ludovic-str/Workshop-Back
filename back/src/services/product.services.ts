import { PrismaClient } from "@prisma/client";
import { CreateProductRequestBody } from "../types/body/productRequestBody.types";

const prisma = new PrismaClient();

const getAllProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

const createProduct = async (
  product: CreateProductRequestBody,
  userId: number
) => {
  const newProduct = await prisma.product.create({
    data: {
      imageId: parseInt(product.imageId),
      name: product.name,
      price: parseInt(product.price),
      color: product.color,
      user: {
        connect: {
          id: userId,
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
