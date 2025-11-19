import { getRecentStories } from '../server/mockDb';

export class StoryService {
    static async getRecentStories(userIds?: string[]) {
        return await getRecentStories(userIds);
    }
}
