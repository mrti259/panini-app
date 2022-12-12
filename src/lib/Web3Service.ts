import Web3 from 'web3';
import type { AppContracts, ContractParams } from './contracts/contracts.server';
import type { FiubaCoin, QatanStickerExchange } from './types';

// eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
var ethereum: any;

export class Web3Service {
	accounts: string[] = [];
	activeAccount = '';
	private web3 = new Web3(ethereum);
	private FiubaCoins: FiubaCoin;
	private QatanStickers: QatanStickerExchange;

	private static instance: Web3Service;

	static getInstance(): Web3Service {
		return this.instance;
	}

	static async createInstance(contracts: AppContracts) {
		ethereum.enable();
		this.instance = new Web3Service(contracts);
		await this.instance.load();
		return this.getInstance();
	}

	constructor(private contracts: AppContracts) {
		this.FiubaCoins = this.initContract(contracts.FiubaCoin);
		this.QatanStickers = this.initContract(contracts.QatanStickerExchange);
	}

	private initContract<ContractInstance>(contract: ContractParams) {
		return new this.web3.eth.Contract(contract.abi, contract.address) as ContractInstance;
	}

	private convertToNumber(result: unknown) {
		return Number(result);
	}

	async load() {
		this.accounts = await this.web3.eth.getAccounts();
		this.activeAccount = this.accounts[0];
	}

	async setUpContracts() {
		await this.QatanStickers.methods.setPrice(1).send({ from: this.activeAccount });
		await this.QatanStickers.methods
			.setCoinAddress(this.contracts.FiubaCoin.address)
			.send({ from: this.activeAccount });
	}

	async getBalance(): Promise<number> {
		return await this.FiubaCoins.methods
			.balanceOf(this.activeAccount)
			.call()
			.then(this.convertToNumber);
	}

	async getCoinPrice(): Promise<number> {
		return await this.FiubaCoins.methods.price().call().then(this.convertToNumber);
	}

	async buyCoins(amount: number) {
		const price = await this.getCoinPrice();
		return await this.FiubaCoins.methods
			.buyCoins(amount)
			.send({ from: this.activeAccount, value: amount * price });
	}

	async getPackagePrice(): Promise<number> {
		return await this.QatanStickers.methods.price().call().then(this.convertToNumber);
	}

	async getPackages(): Promise<number> {
		return await this.QatanStickers.methods
			.getAmountOfPackagesFrom(this.activeAccount)
			.call()
			.then(this.convertToNumber);
	}

	async buyPackages(quantity: number, transferAmount: number) {
		await this.FiubaCoins.methods
			.approve(this.contracts.QatanStickerExchange.address, String(transferAmount))
			.send({ from: this.activeAccount });
		return await this.QatanStickers.methods
			.buyPackages(quantity)
			.send({ from: this.activeAccount });
	}

	async openPackages() {
		return await this.QatanStickers.methods.openPackage().send({ from: this.activeAccount });
	}

	async getStickers() {
		return await this.QatanStickers.methods
			.getStickersFromWallet(this.activeAccount)
			.call()
			.then((stickers) => stickers.map(this.convertToNumber));
	}

	async getExchanges() {
		return await this.QatanStickers.methods.getAllExchanges().send({ from: this.activeAccount });
	}

	async createExchange(tokenId: number, playerId: number) {
		return await this.QatanStickers.methods
			.createExchange(tokenId, playerId)
			.send({ from: this.activeAccount });
	}

	async acceptExchange(exchangeId: number) {
		return await this.QatanStickers.methods
			.acceptExchange(exchangeId)
			.send({ from: this.activeAccount });
	}
}
