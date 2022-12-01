import Web3 from 'web3';
import { config } from 'dotenv';
config();

const providerUrl = process.env['PROCESS_URL']!;
const provider = new Web3.providers.WebsocketProvider(providerUrl);
const web3 = new Web3(provider);

const contract = (abi: any, address?: string) => new web3.eth.Contract(abi, address);

export const FiubaCoin = contract(
	require('../../build/contracts/FiubaCoin.json'),
	process.env['COIN_ADDRESS']
);
export const FiubaSticker = contract(
	require('../../build/contracts/FiubaSticker.json'),
	process.env['STICKER_ADDRESS']
);
export const FiubaExchange = contract(
	require('../../build/contracts/FiubaExchange.json'),
	process.env['EXCHANGE_ADDRESS']
);
export const FiubaPackage = contract(
	require('../../build/contracts/FiubaPackage.json'),
	process.env['PACKAGE_ADDRESS']
);
