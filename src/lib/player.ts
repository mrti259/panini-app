import { Web3Service } from './Web3Service';
import photo from './assets/default_player.jpg';

export interface Player {
	name: string;
	nationality: string;
	jersey_num: number;
	photo: string;
}

const url =
	'https://script.google.com/macros/s/AKfycbxMwXM-AptEHaarJ95tnh0hcY11kZN1zrmCnHjdnwEIyFl0ED4GDjKE9JlrhusIuk8E/exec';
const cache = new Map<number, any>();

export async function loadPlayerFromSticker(stickerId: number) {
	const web3Service = Web3Service.getInstance();
	const playerId = await web3Service.getPlayerId(stickerId);
	return await loadPlayer(playerId);
}

export async function loadPlayer(playerId: number) {
	let data = cache.get(playerId);
	if (!data) {
		const response = await fetch(`${url}?stickerId=${playerId}`);
		data = await response.json();
		cache.set(playerId, data);
	}
	const player = {} as Player;
	player.name = data['name'];
	player.nationality = data['nationality_name'];
	player.jersey_num = data['nation_jersey_number'];
	player.photo = data['player_face_url'];
	return player;
}
