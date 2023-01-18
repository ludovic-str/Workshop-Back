import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import HttpStatus from "http-status";

import { SecurityHelpers } from "../helpers";
import ClientError from "../error";

export default () => {
  return (
    req: FastifyRequest,
    _reply: FastifyReply,
    next: HookHandlerDoneFunction
  ): void => {
    if (!req.headers["authorization"]) {
      next(
        new ClientError({
          name: "ERROR_AUTHENTICATION",
          level: "warm",
          status: HttpStatus.UNAUTHORIZED,
          message: "Invalid token",
        })
      );
      return;
    }

    try {
      const decodedToken = SecurityHelpers.decodeToken(
        req.headers["authorization"]
      );

      req.user = {
        id: decodedToken.id,
        email: decodedToken.email,
      };
      next();
    } catch {
      next(
        new ClientError({
          name: "ERROR_AUTHENTICATION",
          level: "warm",
          status: HttpStatus.UNAUTHORIZED,
          message: "Invalid token",
        })
      );
    }
  };
};
