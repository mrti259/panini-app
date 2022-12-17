import { Web3Service } from './Web3Service';
import photo from './assets/default_player.jpg';

interface Player {
	name: string;
	nationality: string;
	jersey_num: number;
	photo: string;
}

const url =
	'https://script.google.com/macros/s/AKfycbxMwXM-AptEHaarJ95tnh0hcY11kZN1zrmCnHjdnwEIyFl0ED4GDjKE9JlrhusIuk8E/exec';
const cache = new Map<number, any>();

export function initPlayer(): Player {
	return {
		name: 'Nombre',
		nationality: 'Nacionalidad',
		jersey_num: 0,
		photo: photo
	};
}

export async function loadPlayer(stickerId: number): Promise<Player> {
	const web3Service = Web3Service.getInstance();
	const playerId = await web3Service.getPlayerId(stickerId);
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
