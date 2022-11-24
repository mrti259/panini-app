import { writable } from 'svelte/store';

export const state = writable({
	coins: 0,
	packages: 0,
	stickers: 0,
	exchanges: 0,
	packagePrice: 1
});
