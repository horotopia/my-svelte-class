import type { IImage } from "./Image";

export interface IUser {
  _id: string;
  username: string;
  email?: string;
  displayname?: string;
  src?: string;
  password?: string;
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
  images?: IImage[];
}

const User = null as unknown as IUser;
export default User;
