import * as dotenv from "dotenv";

dotenv.config();

const ENV = {
  port: process.env.PORT || "8000",
  clientUrl: process.env.CLIENT_URL || "localhost",
  clientPort: process.env.CLIENT_PORT || "3000",
  secret: process.env.SECRET as string,
};

export default ENV;
