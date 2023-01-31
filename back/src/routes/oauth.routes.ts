import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FastifyPluginOptions } from "fastify/types/plugin";
import httpStatus from "http-status";
import { google } from "googleapis";

import { UserServices } from "../services";
import { FastifyPluginDoneFunction } from "../types/global.types";
import ENV from "../env";

type BaseOauthRequest = FastifyRequest<{
  Body: {
    code: string;
  };
}>;

export default (
  instance: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: FastifyPluginDoneFunction
): void => {
  instance.get("/google/link", (req: FastifyRequest, res: FastifyReply) => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const options = {
      redirect_uri: ENV.googleRedirectUrl,
      client_id: ENV.googleClientId,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    const qs = new URLSearchParams(options);

    res.status(httpStatus.OK).send(`${rootUrl}?${qs.toString()}`);
  });

  instance.post(
    "/google/register",
    async (req: BaseOauthRequest, res: FastifyReply) => {
      const code = req.body.code;

      const oauthClient = new google.auth.OAuth2(
        ENV.googleClientId,
        ENV.googleClientSecret,
        ENV.googleRedirectUrl
      );

      const tokens = (await oauthClient.getToken(code)).tokens;

      oauthClient.setCredentials({ access_token: tokens.access_token });

      const userinfos = (
        await google.oauth2({ version: "v2", auth: oauthClient }).userinfo.get()
      ).data;

      const token = await UserServices.connectOauthUser(
        userinfos.given_name || null,
        userinfos.family_name || null,
        userinfos.email || null,
        userinfos.id || null,
        tokens.refresh_token || null
      );
      res.status(httpStatus.OK).send(token);
    }
  );

  done();
};

export const autoPrefix = "/oauth";
