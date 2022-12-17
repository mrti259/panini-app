import playersJson from '$lib/assets/players.json';

const players = playersJson.data;

export async function load() {
	return { players };
}
