import type { IUser } from './User';

export interface IImage {
  _id: string;
  url: string;
  alt?: string;
  user: string | IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

const Image = null as unknown as IImage;
export default Image;
