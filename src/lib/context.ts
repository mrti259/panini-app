import Web3 from 'web3';
import { PUBLIC_PROVIDER_URL } from '$env/static/public';
import { writable } from 'svelte/store';

export const state = writable({
	coins: 0,
	packages: 0,
	stickers: 0,
	exchanges: 0,
	packagePrice: 1
});

const web3 = new Web3(PUBLIC_PROVIDER_URL);

export const setUpWeb3 = async (contracts: any) => {
	const { FiubaCoin } = contracts;
	const fiubaCoin = new web3.eth.Contract(FiubaCoin.abi, FiubaCoin.address);
	const result = await fiubaCoin.methods.mintPrice().call();
	console.log(result);
};
