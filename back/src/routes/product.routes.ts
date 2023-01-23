import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginOptions } from "fastify/types/plugin";
import httpStatus from "http-status";

import { FastifyPluginDoneFunction } from "../types/global.types";
import { ProductServices } from "../services";
import authentificationMiddleware from "../middlewares/authentification.middleware";
import { SecurityHelpers } from "../helpers";
import { CreateProductRequestBody } from "../types/body/productRequestBody.types";

type CreateProductRequest = FastifyRequest<{
  Body: CreateProductRequestBody;
}>;

type DeleteProductRequest = FastifyRequest<{
  Params: {
    id: string;
  };
}>;

export default (
  instance: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: FastifyPluginDoneFunction
): void => {
  instance.get("/", async (req: FastifyRequest, res: FastifyReply) => {
    const products = await ProductServices.getAllProducts();

    res.status(httpStatus.OK).send(products);
  });

  instance.post(
    "/",
    { onRequest: [authentificationMiddleware()] },
    async (req: CreateProductRequest, res: FastifyReply) => {
      const userInfos = SecurityHelpers.getUserInfos(req);
      const product = await ProductServices.createProduct(
        req.body,
        userInfos.id
      );

      res.status(httpStatus.CREATED).send(product);
    }
  );

  instance.delete(
    "/:id",
    { onRequest: [authentificationMiddleware()] },
    async (req: DeleteProductRequest, res: FastifyReply) => {
      const userInfos = SecurityHelpers.getUserInfos(req);
      const product = await ProductServices.deleteProduct(
        req.params.id,
        userInfos.id
      );

      res.status(httpStatus.OK).send(product);
    }
  );

  done();
};

export const autoPrefix = "/products";
