<script lang="ts">
	import { navigating } from "$app/stores";
	import { spring } from "svelte/motion";

	import { storyViews } from '../store';
	import type { IUser } from '../server/models/User';

	export let user: IUser;

	let isActive: boolean | null = null;

	let tween = spring(0.2, {
		stiffness: 0.1,
		damping: 0.5,
		precision: 0.001
	});

	const rootPath = '/corriges/demo/3';

	$: isActive = !!($navigating && $navigating.from);

	$: if (isActive) {
		setTimeout(() => tween.set(0), 100);
	}

	$: storyViewed = (() => {
		const maybeId: unknown = (user as unknown as { _id?: unknown })?._id;
		if (maybeId == null) return false;

		const images = (user as unknown as { images?: { url: string }[] })?.images;
		if (!images || !images.length) return false;

		const views = $storyViews as Record<string, { timestamp: number; imagesSeen: number[] }>;

		let userId: string = '';
		if (typeof maybeId === 'string') userId = maybeId;
		else if (maybeId != null && typeof (maybeId as { toString?: unknown }).toString === 'function') {
			userId = String((maybeId as { toString: () => string }).toString());
		}
		if (!userId) return false;

		const entry = views[userId];
		if (!entry) return false;
		const now = Date.now();
		if (now - entry.timestamp > 24 * 60 * 60 * 1000) return false;

		return images.every((_img, idx) => Array.isArray(entry.imagesSeen) && entry.imagesSeen.includes(idx));
	})();

	if (typeof window !== 'undefined') {
		storyViews.update((views: Record<string, { timestamp: number; imagesSeen: number[] }>) => {
			const now = Date.now();
			const filtered: Record<string, { timestamp: number; imagesSeen: number[] }> = {};
			for (const [k, v] of Object.entries(views)) {
				if (typeof v === 'object' && v && typeof v.timestamp === 'number' && now - v.timestamp < 24 * 60 * 60 * 1000) filtered[k] = v;
			}
			return filtered;
		});
	}

	function openStory() {
		console.log('openStory called for user', user);
		const views = $storyViews as Record<string, { timestamp: number; imagesSeen: number[] }>;
		const maybeId: unknown = (user as unknown as { _id?: unknown })._id;

		let userId: string = '';
		if (typeof maybeId === 'string') userId = maybeId;
		else if (maybeId != null && typeof (maybeId as { toString?: unknown }).toString === 'function') {
			userId = String((maybeId as { toString: () => string }).toString());
		}

		const entry = views[userId];
		const images = (user as unknown as { images?: { url: string }[] }).images as { url: string }[] | undefined;
		if (!images || !images.length) return;
		let imgIdx = 0;
		if (entry && Array.isArray(entry.imagesSeen)) {
			imgIdx = images.findIndex((_img, idx) => !entry.imagesSeen.includes(idx));
			if (imgIdx === -1) {
				imgIdx = 0;
			}
		}

		const username = (user as unknown as { username?: string }).username ?? '';
		const target = `${rootPath}/images/${username}/${imgIdx + 1}`;
		console.log('openStory -> navigating to', target);
		location.href = `${rootPath}/images/${username}/${imgIdx + 1}`;
	}
</script>

<div>
	<button type="button" data-sveltekit-prefetch class="cursor-pointer" on:click={() => openStory()}>
		<div
			class={`flex h-16 w-16 items-center justify-self-center justify-center rounded-full bg-neutral-200 ${storyViewed ? '' : 'bg-gradient-to-t from-[#f09433] via-[#dc2743] to-[#bc1888]'}`}
		>
			<img
				src={user.src}
				alt="Marcus Lesch avatar"
				class="h-14 w-14 rounded-full outline outline-white"
				style={isActive
					? `transform: translate3d(${$tween * 10}px, ${$tween * 10}px, 0px) scale(${
						$tween * 3 + 1
					}); transition: none;`
				: ''}
			/>
		</div>
		<h3 class="text-sm font-bold text-gray-900 mt-1 flex items-center justify-center">
			<slot />
		</h3>
	</button>
</div>
