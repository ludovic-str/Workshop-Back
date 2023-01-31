import * as dotenv from "dotenv";

dotenv.config();

const ENV = {
  port: process.env.PORT || "8000",
  clientUrl: process.env.CLIENT_URL || "localhost",
  clientPort: process.env.CLIENT_PORT || "3000",
  secret: process.env.SECRET as string,
  googleClientId: process.env.GOOGLE_CLIENT_ID as string,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  googleRedirectUrl: process.env.GOOGLE_REDIRECT_URL as string,
};

export default ENV;
