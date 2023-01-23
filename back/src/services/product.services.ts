import { PrismaClient } from "@prisma/client";
import { CreateProductRequestBody } from "../types/body/productRequestBody.types";
import ClientError from "../error";
import httpStatus from "http-status";

const prisma = new PrismaClient();

const getAllProducts = async () => {
  const products = await prisma.product.findMany();

  return products;
};

const getProductsByUserId = async (id: number) => {
  const products = await prisma.product.findMany({
    where: {
      userId: id,
    },
  });

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

const deleteProduct = async (id: string, userId: number) => {
  if (isNaN(parseInt(id))) {
    throw new ClientError({
      name: "Invalid Credential",
      message: "id is not a number",
      level: "warm",
      status: httpStatus.BAD_REQUEST,
    });
  }

  const product = await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
    select: {
      userId: true,
    },
  });

  if (product.userId !== userId) {
    throw new ClientError({
      name: "Invalid Credential",
      message: "you are not the owner of this product",
      level: "warm",
      status: httpStatus.BAD_REQUEST,
    });
  }

  return product;
};

export default {
  getAllProducts,
  createProduct,
  getProductsByUserId,
  deleteProduct,
};
