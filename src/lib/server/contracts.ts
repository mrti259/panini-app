import {
	COIN_ADDRESS,
	STICKER_ADDRESS,
	PACKAGE_ADDRESS,
	EXCHANGE_ADDRESS
} from '$env/static/private';
import FiubaCoinJson from './build/contracts/FiubaCoin.json';
import QatanStickerJson from './build/contracts/QatanSticker.json';
import QatanStickerPackageJson from './build/contracts/QatanStickerPackage.json';
import QatanStickerExchangeJson from './build/contracts/QatanStickerExchange.json';

const contract = function (abi: any, address: string) {
	return { abi, address };
};

const FiubaCoin = contract(FiubaCoinJson.abi, COIN_ADDRESS);
const QatanSticker = contract(QatanStickerJson.abi, STICKER_ADDRESS);
const QatanExchange = contract(QatanStickerExchangeJson.abi, EXCHANGE_ADDRESS);
const QatanPackage = contract(QatanStickerPackageJson, PACKAGE_ADDRESS);

export default { FiubaCoin, QatanSticker, QatanExchange, QatanPackage };
