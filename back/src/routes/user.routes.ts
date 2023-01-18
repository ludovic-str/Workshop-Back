import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginOptions } from "fastify/types/plugin";
import httpStatus from "http-status";

import { UserServices } from "../services";
import { FastifyPluginDoneFunction } from "../types/global.types";
import { LoginBody, RegisterBody } from "../types/body/userRequestBody.types";

type RegisterRequest = FastifyRequest<{
  Body: RegisterBody;
}>;

type LoginRequest = FastifyRequest<{
  Body: LoginBody;
}>;

export default (
  instance: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: FastifyPluginDoneFunction
): void => {
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

  done();
};

export const autoPrefix = "/users";
