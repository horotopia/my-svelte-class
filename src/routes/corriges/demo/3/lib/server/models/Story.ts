import type { IUser } from './User';
import type { IImage } from './Image';

export interface IStory {
  _id: string;
  user: IUser;
  image?: IImage[] | string[];
  images?: IImage[];
  src?: string;
  delay?: number;
  createdAt: Date;
  updatedAt: Date;
}

const Story = null as unknown as IStory;
export default Story;
