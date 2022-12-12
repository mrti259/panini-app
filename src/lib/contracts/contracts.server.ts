import FiubaCoinJson from './build/contracts/FiubaCoin.json';
import QatanStickerExchangeJson from './build/contracts/QatanStickerExchange.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function contract(json: { abi: any; networks: Record<string, { address: string }> }) {
	const network = Object.values(json.networks).pop();
	const address = network?.address || '';
	return { abi: json.abi, address };
}

const FiubaCoin = contract(FiubaCoinJson);
const QatanStickerExchange = contract(QatanStickerExchangeJson);

const contracts = { FiubaCoin, QatanStickerExchange };

export default contracts;
export type AppContracts = typeof contracts;
export type ContractParams = ReturnType<typeof contract>;
