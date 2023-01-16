import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { Token } from "../types/global.types";
import ClientError from "../error";
import httpStatus from "http-status";
import ENV from "../env";

const prisma = new PrismaClient();

const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<Token> => {
  const userWithSameMail = await prisma.user.findFirst({ where: { email } });

  if (userWithSameMail !== null) {
    throw new ClientError({
      name: "Invalid Credential",
      message: "email already taken",
      level: "warm",
      status: httpStatus.BAD_REQUEST,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      tokensTable: { create: {} },
    },
  });

  const exp = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);

  const token = jwt.sign(
    { id: user.id, email, role: user.role, expTime: exp },
    ENV.secret
  );

  return { token };
};

const loginUser = async (email: string, password: string): Promise<Token> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user === null) {
    throw new ClientError({
      name: "Invalid Credential",
      message: "email does not exist",
      level: "warm",
      status: httpStatus.BAD_REQUEST,
    });
  }

  const same = await bcrypt.compare(password, user.password);

  if (same === false) {
    throw new ClientError({
      name: "Invalid Credential",
      message: "password doesn't match",
      level: "warm",
      status: httpStatus.BAD_REQUEST,
    });
  }

  const token = jwt.sign({ id: user.id, email, role: user.role }, ENV.secret);

  return { token };
};

export default { createUser, loginUser };
