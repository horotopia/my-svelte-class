import { StoryImageService } from '../../../lib/services/StoryImageService';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { username, img } = params;
    try {
        const result = await StoryImageService.getUserStoryImages(username, img);
        if ('error' in result) {
            return { status: result.status, error: result.error };
        }
        return result;
    } catch (err: Error | unknown) {
        return {
            status: 500,
            error: err instanceof Error ? err.message : 'Unknown error'
        }
    }
}
