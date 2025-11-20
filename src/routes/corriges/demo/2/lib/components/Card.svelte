<script lang="ts">

    import type { IPost } from '../types/Post';

    export let post: IPost;

</script>

<div class="rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md">
    <h2 class="mb-2 text-xl font-semibold text-gray-800">{post.title}</h2>
    <p class="mb-4 text-gray-600">{post.body}</p>
    <div class="flex items-center justify-between text-sm text-gray-500">
        <span>Likes: {post.reactions.likes}</span>
        <span>Dislikes: {post.reactions.dislikes}</span>
        <span>Views: {post.views}</span>
    </div>
</div>
