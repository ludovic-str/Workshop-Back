export interface ClientErrorType {
  level: string;
  message: string;
  name: string;
  status: number;
}

export interface Token {
  token: string;
}

export interface UserInfos {
  id: number;
  email: string;
}

export type FastifyPluginDoneFunction = (err?: Error) => void;
