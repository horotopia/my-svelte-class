<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import StoryButton from "./StoryButton.svelte";
	import type { IUser } from '../server/models/User';
	import type { IStory } from '../server/models/Story';
	import type { IImage } from '../server/models/Image';


	let users: IUser[] = [];
	let controller: AbortController | null = null;

	function extractImages(story: IStory): IImage[] {
		if (Array.isArray(story.images)) return story.images as IImage[];
		if (Array.isArray(story.image)) {
			return (story.image as unknown[])
				.filter((i): i is IImage => i !== null && typeof i === 'object' && 'url' in i && 'user' in i);
		}
		return [];
	}

	async function fetchUsers() {
		controller?.abort();
		controller = new AbortController();

		try {
			const res = await fetch('3/api/stories', { signal: controller.signal });
			if (!res.ok) {
				users = [];
				return;
			}

			const stories = (await res.json()) as IStory[];
			users = stories.map((story) => ({
				...(story.user ?? {}),
				images: extractImages(story),
				storyId: story._id
			} as IUser));
		} catch (err: unknown) {
			if (err instanceof DOMException && err.name === 'AbortError') return;
			console.error('Failed to fetch stories:', err);
			users = [];
		}
	}

	onDestroy(() => controller?.abort());
	onMount(() => {
		fetchUsers();
	});
</script>

<div class="relative mb-4 flex w-full md:max-w-8/10 justify-self-center overflow-hidden">
	<div
		class="relative flex flex-1 flex-nowrap space-x-4 overflow-hidden rounded-xl pt-2 pb-2 lg:p-4 ml-4 mr-4"
	>
		<div class="flex flex-nowrap gap-6 overflow-x-scroll scrollbar-none pl-1 pr-5 no-scrollbar">
			<ul class="flex gap-6 list-none overflow-x-auto scroll-container">
				{#each users as user (user._id)}
					<li class="flex flex-col items-center">
						<StoryButton
							user={user}
						>
							{user.displayname}
						</StoryButton>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
