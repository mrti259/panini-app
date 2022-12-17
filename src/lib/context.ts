import { writable } from 'svelte/store';

export const state = writable({
	coins: 0,
	packages: 0,
	stickers: [] as number[],
	exchanges: [] as number[],
	packagePrice: 1,
	activeAccount: '',
	accounts: [] as string[]
});
