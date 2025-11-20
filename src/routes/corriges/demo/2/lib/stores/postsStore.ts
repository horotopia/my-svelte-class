import { writable } from 'svelte/store';
import type { IPost } from '../types/Post';
import { browser } from '$app/environment';

const STORAGE_KEY = 'posts-demo-2';

function createPostsStore() {
  const { subscribe, set, update } = writable<IPost[]>([]);

  const persist = (posts: IPost[]) => {
    if (!browser) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error: Error | unknown) {
      console.error('Could not persist posts', error);
    }
  };

  const init = async () => {
    if (!browser) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        set(JSON.parse(raw));
        return;
      }

      const res = await fetch('https://dummyjson.com/posts');
      const data = await res.json();
      set(data.posts);
      persist(data.posts);
    } catch (error: Error | unknown) {
      console.error('Failed to initialize posts store', error);
    }
  };

  if (browser) init();

  return {
    subscribe,
    addPost: (post: Omit<IPost, 'id'>) => {
      update(posts => {
        const id = posts.length ? Math.max(...posts.map(p => p.id)) + 1 : 1;
        const newPost: IPost = { id, ...post } as IPost;
        const next = [newPost, ...posts];
        persist(next);
        return next;
      });
    },
    updatePost: (id: number, patch: Partial<IPost>) => {
      update(posts => {
        const next = posts.map(p => (p.id === id ? { ...p, ...patch } : p));
        persist(next);
        return next;
      });
    },
    deletePost: (id: number) => {
      update(posts => {
        const next = posts.filter(p => p.id !== id);
        persist(next);
        return next;
      });
    },
    setPosts: (posts: IPost[]) => {
      set(posts);
      persist(posts);
    },
    clear: () => {
      set([]);
      persist([]);
    },
    _init: init
  };
}

export const postsStore = createPostsStore();
