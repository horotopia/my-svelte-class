<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { IPost } from '../types/Post';

  export let post: IPost;
  const dispatch = createEventDispatcher();

  function edit() {
    dispatch('edit', { post });
  }

  function remove() {
    dispatch('delete', { id: post.id });
  }
</script>

<div class="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md">
  <h3 class="mb-2 text-lg font-semibold text-gray-800">{post.title}</h3>
  <p class="mb-3 text-gray-600">{post.body}</p>
  <div class="flex items-center justify-between text-sm text-gray-500 mb-2">
    <span>Likes: {post.reactions?.likes ?? 0}</span>
    <span>Views: {post.views ?? 0}</span>
  </div>
  <div class="flex gap-2">
    <button on:click={edit} class="px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
    <button on:click={remove} class="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
  </div>
</div>
