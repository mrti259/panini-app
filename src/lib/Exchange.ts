import { Web3Service } from './Web3Service';
import { loadPlayer, loadPlayerFromSticker, type Player } from './player';

export interface Exchange {
	id: number;
	tokenId: number;
	token: Player;
	player: Player;
}

const cache = new Map<number, Exchange>();

export async function loadExchange(exchangeId: number) {
	let exchange = cache.get(exchangeId);
	if (exchange) return exchange;

	const web3Service = Web3Service.getInstance();
	const { tokenIdToExchange, playerIdWanted } = await web3Service.getExchangeData(exchangeId);
	const tokenId = Number(tokenIdToExchange);
	exchange = {
		id: exchangeId,
		tokenId,
		token: await loadPlayerFromSticker(tokenId),
		player: await loadPlayer(Number(playerIdWanted))
	};
	cache.set(exchangeId, exchange);
	return exchange;
}
