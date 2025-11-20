import type { IUser } from './models/User';
import type { IImage } from './models/Image';
import type { IStory } from './models/Story';

type StoryImage = IImage & { src: string; delay?: number };

const now = Date.now();

const users: IUser[] = [
    { _id: 'u1', username: 'alice', displayname: 'Alice', src: '/images/profiles/profile1.jpg' },
    { _id: 'u2', username: 'bob', displayname: 'Bob', src: '/images/profiles/profile2.jpg' },
    { _id: 'u3', username: 'oliver', displayname: 'Oliver', src: '/images/profiles/profile3.jpg' }
];

const images: IImage[] = [
    { _id: 'i1', url: '/images/stories/1.jpg', alt: 'Story 1', user: 'u1' },
    { _id: 'i2', url: '/images/stories/2.jpg', alt: 'Story 2', user: 'u2' },
    { _id: 'i3', url: '/images/stories/3.jpg', alt: 'Story 3', user: 'u3' },
    { _id: 'i4', url: '/images/stories/4.jpg', alt: 'Story 4', user: 'u1' },
    { _id: 'i5', url: '/images/stories/5.jpg', alt: 'Story 5', user: 'u1' },
    { _id: 'i6', url: '/images/stories/6.jpg', alt: 'Story 6', user: 'u1' }
];

const stories: IStory[] = [
    { _id: 's1', user: users[0], image: ['i1'], delay: 2000, updatedAt: new Date(now - 1000), createdAt: new Date() },
    { _id: 's2', user: users[0], image: ['i2'], delay: 2000, updatedAt: new Date(now - 1500), createdAt: new Date() },
    { _id: 's3', user: users[1], image: ['i3'], delay: 2000, updatedAt: new Date(now - 2000), createdAt: new Date() },
    { _id: 's4', user: users[1], image: ['i4'], delay: 200, updatedAt: new Date(now - 2500), createdAt: new Date() },
    { _id: 's5', user: users[2], image: ['i5'], delay: 2000, updatedAt: new Date(now - 3000), createdAt: new Date() },
    { _id: 's6', user: users[2], image: ['i6'], delay: 2000, updatedAt: new Date(now - 3500), createdAt: new Date() }
];

function wait(ms = 50) {
    return new Promise((res) => setTimeout(res, ms));
}

export async function getRecentStories(userIds?: string[]) {
    await wait();
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    const filtered = stories.filter((s) => s.updatedAt.getTime() >= cutoff && (!userIds || userIds.length === 0 || userIds.includes(s.user._id)));

    const map = new Map<string, { _id: string; user: IUser; images: StoryImage[] }>();
    for (const s of filtered.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())) {
        const u = users.find((x) => x._id === s.user._id)!;
        if (!map.has(u._id)) {
            map.set(u._id, { _id: u._id, user: { ...u }, images: [] });
        }
        const entry = map.get(u._id)!;
        if (s.image) {
            for (const imgId of s.image) {
                const img = images.find((x) => x._id === imgId);
                if (!img) continue;
                entry.images.push({ ...img, src: img.url, delay: s.delay });
            }
        }
    }
    return Array.from(map.values());
}

export async function getUserStoryImages(username: string, imgParam: string) {
    await wait();
    const user = users.find((u) => u.username === username);
    if (!user) return { error: 'User not found', status: 404 };
    const userStories = stories.filter((s) => (s.user as IUser)._id === user._id);
    const imgs = userStories.flatMap((s) =>
        (s.image ?? [])
            .map((id) => {
                const img = images.find((x) => x._id === id);
                return img ? ({ ...img, src: img.url, delay: s.delay } as StoryImage) : null;
            })
            .filter(Boolean)
    ) as StoryImage[];
    if (imgs.length === 0) return { error: 'No active story for this user', status: 404 };
    const imgIndex = parseInt(imgParam) - 1;
    if (isNaN(imgIndex) || imgIndex < 0 || imgIndex >= imgs.length) return { error: 'Image not found', status: 404 };

    const all = await getRecentStories();
    const usersList = all.map((entry) => ({
        ...entry.user,
        images: entry.images,
        storyId: entry._id
    }));
    const safeUser = { ...user, _id: user._id, images: imgs, storyId: userStories[0]?._id };
    return { user: safeUser, users: usersList, imgIndex };
}

export async function findUserById(id: string) {
    await wait();
    return users.find((u) => u._id === id) || null;
}

export async function findUserByUsername(username: string) {
    await wait();
    return users.find((u) => u.username === username) || null;
}
