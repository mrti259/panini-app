import Web3 from 'web3';
import type { AppContracts, ContractParams } from './contracts/contracts.server';
import type { FiubaCoin, QatanStickerExchange, QatanStickerPackage } from './types';

export class Web3Service {
	accounts: string[] = [];
	activeAccount = '';
	private web3 = new Web3(window.ethereum);
	private FiubaCoins: FiubaCoin;
	private QatanStickerPackage: QatanStickerPackage;
	private QatanStickerExchange: QatanStickerExchange;

	private static instance: Web3Service;

	static getInstance(): Web3Service {
		return this.instance;
	}

	static async createInstance(contracts: AppContracts) {
		window.ethereum.enable();
		this.instance = new Web3Service(contracts);
		await this.instance.load();
		return this.getInstance();
	}

	constructor(private contracts: AppContracts) {
		this.FiubaCoins = this.initContract(contracts.FiubaCoin);
		this.QatanStickerExchange = this.initContract(contracts.QatanStickerExchange);
		this.QatanStickerPackage = this.initContract(contracts.QatanStickerPackage);
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

	async getBalance() {
		return await this.FiubaCoins.methods
			.balanceOf(this.activeAccount)
			.call()
			.then(this.convertToNumber);
	}

	async getCoinPrice() {
		return await this.FiubaCoins.methods.mintPrice().call().then(this.convertToNumber);
	}

	async getPlayerId(stickerId: number) {
		return await this.QatanStickerExchange.methods
			.getPlayerIdFromStickerId(stickerId)
			.call()
			.then(this.convertToNumber);
	}

	async buyCoins(amount: number) {
		const price = await this.getCoinPrice();
		return await this.FiubaCoins.methods
			.getFiubaCoin(amount)
			.send({ from: this.activeAccount, value: amount * Number(price) });
	}

	async getPackagePrice() {
		//return await this.QatanStickerPackage.methods.price().call().then(this.convertToNumber);
		return await Promise.resolve(1 * 10 ** 18);
	}

	async getPackages() {
		return await this.QatanStickerPackage.methods
			.getAmountOfPackagesFrom(this.activeAccount)
			.call()
			.then(this.convertToNumber);
	}

	async buyPackages(quantity: number, transferAmount: number) {
		await this.FiubaCoins.methods
			.approve(this.contracts.QatanStickerPackage.address, String(transferAmount))
			.send({ from: this.activeAccount });
		return await this.QatanStickerPackage.methods
			.buyPackages(quantity)
			.send({ from: this.activeAccount, gas: 900_000 });
	}

	async openPackages() {
		return await this.QatanStickerPackage.methods.openPackage().send({ from: this.activeAccount });
	}

	async getStickers() {
		return await this.QatanStickerExchange.methods
			.getStickersFromWallet(this.activeAccount)
			.call()
			.then((res) => res.map(this.convertToNumber));
	}

	async getExchanges() {
		return await this.QatanStickerExchange.methods
			.getAllExchanges()
			.call()
			.then((res) => res.map(this.convertToNumber));
	}

	async createExchange(tokenId: number, playerId: number) {
		return await this.QatanStickerExchange.methods
			.iWantToExchange(tokenId, playerId)
			.send({ from: this.activeAccount });
	}

	async acceptExchange(exchangeId: number) {
		return await this.QatanStickerExchange.methods
			.acceptExchange(exchangeId)
			.send({ from: this.activeAccount });
	}

	async getExchangeData(exchangeId: number) {
		return await this.QatanStickerExchange.methods.exchanges(exchangeId).call();
	}
}
