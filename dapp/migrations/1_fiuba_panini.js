// @ts-nocheck
const FiubaCoin = artifacts.require('FiubaCoin');
const FiubaSticker = artifacts.require('FiubaSticker');
const FiubaExchange = artifacts.require('FiubaExchange');
const FiubaPackage = artifacts.require('FiubaPackage');

module.exports = async function (_deployer) {
	await _deployer.deploy(FiubaCoin);
	await _deployer.deploy(FiubaExchange);
	const fiubaSticker = await _deployer.deploy(FiubaSticker);
	const fiubaPackage = await _deployer.deploy(FiubaPackage);

	fiubaPackage.setCoinAddress(FiubaCoin.address);
	fiubaPackage.setStickerAddress(FiubaSticker.address);
	fiubaSticker.setPackageAddress(FiubaPackage.address);
};
