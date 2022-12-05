import { PUBLIC_PROVIDER_URL } from '$env/static/public';
import Web3 from 'web3';
import type { AppContracts, ContractParams } from './contracts/contracts.server';
import type {
	FiubaCoinInstance,
	QatanStickerExchangeInstance,
	QatanStickerInstance,
	QatanStickerPackageInstance
} from './types';

export class Web3Service {
	web3 = new Web3(PUBLIC_PROVIDER_URL);
	FiubaCoins: FiubaCoinInstance;
	QatanStickers: QatanStickerInstance;
	QatanStickerPackage: QatanStickerPackageInstance;
	QatanStickerExchange: QatanStickerExchangeInstance;

	private static instance: Web3Service;

	static getInstance(): Web3Service {
		return this.instance;
	}

	static createInstance(contracts: AppContracts) {
		this.instance = new Web3Service(contracts);
		return this.getInstance();
	}

	constructor(contracts: AppContracts) {
		this.FiubaCoins = this.initContract(contracts.FiubaCoin);
		this.QatanStickers = this.initContract(contracts.QatanSticker);
		this.QatanStickerPackage = this.initContract(contracts.QatanStickerPackage);
		this.QatanStickerExchange = this.initContract(contracts.QatanStickerExchange);
	}

	private initContract<ContractInstance>(contract: ContractParams) {
		return new this.web3.eth.Contract(contract.abi, contract.address) as ContractInstance;
	}

	private logError(error: string) {
		console.log(error);
	}

	private convertToNumber(result: unknown) {
		return Number(result);
	}

	async getAccount() {
		return (await this.web3.eth.getAccounts()).at(0);
	}

	async getBalance(): Promise<number> {
		const account = await this.getAccount();
		if (!account) return 0;
		return await this.FiubaCoins.methods
			.balanceOf(account)
			.call()
			.then(this.convertToNumber)
			.catch(this.logError);
	}

	async getCoinPrice(): Promise<number> {
		return await this.FiubaCoins.methods.price().call();
	}

	async buyCoins(amount: number) {
		const account = await this.getAccount();
		if (!account) return 0;
		const price = await this.getCoinPrice();
		return await this.FiubaCoins.methods
			.buyCoins(amount)
			.send({ from: account, value: amount * price });
	}

	async getPackagePrice(): Promise<number> {
		return await this.QatanStickerPackage.methods.price().call();
	}

	async getPackages(): Promise<number> {
		const account = await this.getAccount();
		if (!account) return 0;
		return await this.QatanStickerPackage.methods
			.getAmountOfPackagesFrom(account)
			.call()
			.then(this.convertToNumber)
			.catch(this.logError);
	}

	async buyPackages(quantity: number) {
		const account = await this.getAccount();
		if (!account) return 0;
		await this.FiubaCoins.methods
			.approve(this.QatanStickerPackage._address, quantity * (await this.getPackagePrice()))
			.send({ from: account });
		return await this.QatanStickerPackage.methods.buyPackages(quantity).send({ from: account });
	}

	async openPackages() {
		const account = await this.getAccount();
		if (!account) return;
		return await this.QatanStickerPackage.methods.openPackage().send({ from: account });
	}

	async getStickers() {
		const account = await this.getAccount();
		if (!account) return 0;
		return await this.QatanStickers.methods
			.getStickersFromWallet(account)
			.call()
			.then(this.convertToNumber)
			.catch(this.logError);
	}

	async getExchanges() {
		const account = await this.getAccount();
		if (!account) return 0;
		return await this.QatanStickerExchange.methods.getAllExchanges().send({ from: account });
	}

	async createExchange(tokenId: number, playerId: number) {
		const account = await this.getAccount();
		if (!account) return 0;
		return await this.QatanStickerExchange.methods
			.createExchange(tokenId, playerId)
			.send({ from: account });
	}

	async acceptExchange(exchangeId: number) {
		const account = await this.getAccount();
		if (!account) return 0;
		return await this.QatanStickerExchange.methods
			.acceptExchange(exchangeId)
			.send({ from: account });
	}
}
