import { writable } from 'svelte/store';

export const state = writable({
	coins: 0,
	packages: 0,
	stickers: [] as number[],
	exchanges: 0,
	packagePrice: 1,
	decimals: 1,
	activeAccount: '',
	accounts: [] as string[]
});
