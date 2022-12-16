import FiubaCoinJson from './build/contracts/FiubaCoin.json';
import QatanStickerPackageJson from './build/contracts/QatanStickerPackage.json';
import QatanStickerExchangeJson from './build/contracts/QatanStickerExchange.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function contract(json: { abi: any; }, address : string) {
	return { abi: json.abi, address };
}

const FiubaCoin = contract({abi: FiubaCoinJson}, '0x148D6b978AAea16197dE117fDB53f0B58bBEBB23');
const QatanStickerExchange = contract({abi: QatanStickerExchangeJson}, '0x615697eFf8eA399Eab84262b8c442730EDBE4902');
const QatanStickerPackage = contract({abi: QatanStickerPackageJson}, '0x2AF0434f0Ce85f2587eb542F894019F5AD9b759C');

const contracts = { FiubaCoin, QatanStickerExchange, QatanStickerPackage };

export default contracts;
export type AppContracts = typeof contracts;
export type ContractParams = ReturnType<typeof contract>;
