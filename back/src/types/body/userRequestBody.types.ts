export interface RegisterBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface LoginBody {
  email: string;
  password: string;
}
