export interface UserModel {
  id: number;
  pseudo: string;
  email: string;
  password: string | undefined;
  token: string;
  createdAt: Date;
  role: any;
}
