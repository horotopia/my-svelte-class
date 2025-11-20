<script lang="ts">
  import { onDestroy } from 'svelte';
  import { postsStore } from '../stores/postsStore';
  import type { IPost } from '../types/Post';
  import PostCard from './PostCard.svelte';

  let posts: IPost[] = [];

  const unsubscribe = postsStore.subscribe(value => (posts = value));

  let title = '';
  let body = '';
  let editingId: number | null = null;

  function resetForm() {
    title = '';
    body = '';
    editingId = null;
  }

  function submit() {
    if (!title.trim() || !body.trim()) return;
    const base = {
      title: title.trim(),
      body: body.trim(),
      userId: 1,
      tags: [],
      reactions: { likes: 0, dislikes: 0 },
      views: 0
    } as Omit<IPost, 'id'>;

    if (editingId) {
      postsStore.updatePost(editingId, base as Partial<IPost>);
    } else {
      postsStore.addPost(base as Omit<IPost, 'id'>);
    }
    resetForm();
  }

  function onEdit(event: CustomEvent) {
    const p: IPost = event.detail.post;
    editingId = p.id;
    title = p.title;
    body = p.body;
  }

  function onDelete(event: CustomEvent) {
    const id: number = event.detail.id;
    postsStore.deletePost(id);
  }

  onDestroy(() => unsubscribe());
</script>

<div>
  <form on:submit|preventDefault={submit} class="mb-6">
    <div class="mb-2">
      <input bind:value={title} placeholder="Titre" class="w-full border p-2 rounded" />
    </div>
    <div class="mb-2">
      <textarea bind:value={body} placeholder="Corps" class="w-full border p-2 rounded"></textarea>
    </div>
    <div class="flex gap-2">
      <button type="submit" class="px-3 py-1 bg-green-600 text-white rounded">{editingId ? 'Mettre à jour' : 'Ajouter'}</button>
      <button type="button" on:click={resetForm} class="px-3 py-1 border rounded">Reset</button>
      <button type="button" on:click={() => postsStore.clear()} class="px-3 py-1 bg-gray-700 text-white rounded">Clear</button>
    </div>
  </form>

  {#if posts.length === 0}
    <p class="text-gray-600">Aucun post enregistré.</p>
  {:else}
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {#each posts as post (post.id)}
        <PostCard {post} on:edit={onEdit} on:delete={onDelete} />
      {/each}
    </div>
  {/if}
</div>
