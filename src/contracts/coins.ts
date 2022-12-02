import Web3 from 'web3';
import { FiubaCoin } from './contracts';

export async function getBalance(account: string) {
	return await FiubaCoin.methods.balance(account).call();
}

export async function buyCoins(account: string, amount: number) {
	const price = getCoinPrice();
	return await FiubaCoin.methods
		.buy(amount)
		.send({ from: account, value: Web3.utils.toWei(String(price), 'ether') });
}

export async function getCoinPrice() {
	return await FiubaCoin.methods.price().call();
}
