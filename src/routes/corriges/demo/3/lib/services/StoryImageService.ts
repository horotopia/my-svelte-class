import { getUserStoryImages } from '../server/mockDb';

export class StoryImageService {
    static async getUserStoryImages(username: string, img: string) {
        return await getUserStoryImages(username, img);
    }
}
