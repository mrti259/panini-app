import {
	PROVIDER_URL,
	COIN_ADDRESS,
	STICKER_ADDRESS,
	PACKAGE_ADDRESS,
	EXCHANGE_ADDRESS
} from '$env/static/private';
import FiubaCoinJson from './artifacts/FiubaCoin.json';
import FiubaStickerJson from './artifacts/FiubaSticker.json';
import FiubaPackageJson from './artifacts/FiubaPackage.json';
import FiubaExchangeJson from './artifacts/FiubaExchange.json';

const contract = function (abi: any, address: string) {
	return { abi, address };
};

const FiubaCoin = contract(FiubaCoinJson.abi, COIN_ADDRESS);
const FiubaSticker = contract(FiubaStickerJson.abi, STICKER_ADDRESS);
const FiubaExchange = contract(FiubaExchangeJson.abi, EXCHANGE_ADDRESS);
const FiubaPackage = contract(FiubaPackageJson, PACKAGE_ADDRESS);

export default { FiubaCoin, FiubaSticker, FiubaExchange, FiubaPackage };
