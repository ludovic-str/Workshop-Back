import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginOptions } from "fastify/types/plugin";
import httpStatus from "http-status";

import { ProductServices, SaleServices, UserServices } from "../services";
import { FastifyPluginDoneFunction } from "../types/global.types";
import { LoginBody, RegisterBody } from "../types/body/userRequestBody.types";
import authentificationMiddleware from "../middlewares/authentification.middleware";
import { SecurityHelpers } from "../helpers";

type RegisterRequest = FastifyRequest<{
  Body: RegisterBody;
}>;

type LoginRequest = FastifyRequest<{
  Body: LoginBody;
}>;

type CreateSaleRequest = FastifyRequest<{
  Body: {
    userId: number;
    name: string;
    amount: number;
  };
}>;

export default (
  instance: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: FastifyPluginDoneFunction
): void => {
  instance.get(
    "/me",
    { onRequest: [authentificationMiddleware()] },
    async (req: FastifyRequest, res: FastifyReply) => {
      const userInfos = SecurityHelpers.getUserInfos(req);

      console.log(userInfos);

      const user = await UserServices.getOneUser(userInfos.id);

      res.status(httpStatus.OK).send(user);
    }
  );

  instance.get(
    "/sales",
    { onRequest: [authentificationMiddleware()] },
    async (req: FastifyRequest, res: FastifyReply) => {
      const userInfos = SecurityHelpers.getUserInfos(req);
      const sales = await SaleServices.getUserSales(userInfos.id);

      res.status(httpStatus.OK).send(sales);
    }
  );

  instance.post("/", async (req: RegisterRequest, res: FastifyReply) => {
    const token = await UserServices.createUser(
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.password
    );

    res.status(httpStatus.OK).send(token);
  });

  instance.post("/login", async (req: LoginRequest, res: FastifyReply) => {
    const token = await UserServices.loginUser(
      req.body.email,
      req.body.password
    );

    res.status(httpStatus.OK).send(token);
  });

  instance.get(
    "/products",
    { onRequest: [authentificationMiddleware()] },
    async (req: FastifyRequest, res: FastifyReply) => {
      const userInfos = SecurityHelpers.getUserInfos(req);
      const products = await ProductServices.getProductsByUserId(userInfos.id);

      res.status(httpStatus.OK).send(products);
    }
  );

  instance.get(
    "/products/liked",
    { onRequest: [authentificationMiddleware()] },
    async (req: FastifyRequest, res: FastifyReply) => {
      const userInfos = SecurityHelpers.getUserInfos(req);
      const products = await ProductServices.getLikedProducts(userInfos.id);

      res.status(httpStatus.OK).send(products);
    }
  );

  instance.post(
    "/sales",
    { onRequest: [authentificationMiddleware()] },
    async (req: CreateSaleRequest, res: FastifyReply) => {
      const userInfos = SecurityHelpers.getUserInfos(req);
      const sale = await SaleServices.createSale(
        req.body.userId,
        req.body.amount,
        req.body.name
      );

      res.status(httpStatus.OK).send(sale);
    }
  );

  done();
};

export const autoPrefix = "/users";
