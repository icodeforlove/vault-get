import Vault from 'node-vault';
import traverse from 'traverse';

class VaultGet {
	constructor (config) {
		this.vault = Vault({
			apiVersion: 'v1',
			endpoint: config.endpoint,
			token: config.token
		});

		this.keys = config.keys || [config.key];
		this.secret_shares = config.secret_shares || 1;
	}

	getTraversableLeafs (object) {
		let leafs = [];

		traverse(object).forEach(function () {
			if (this.isLeaf) {
				leafs.push({key: traverse(object).get(this.path), path: this.path});
			}
		});

		return leafs;
	}

	async get (config) {
		for (let key = 0; key < this.keys.length; key++) {
			await this.vault.unseal({secret_shares: this.secret_shares, key: this.keys[key]});
		}

		let leafs = this.getTraversableLeafs(config);

		for (let leaf = 0; leaf < leafs.length; leaf++) {
			let { key, path } = leafs[leaf];

			try {
				traverse(config).set(path, (await this.vault.read(`secret/${key}`)).data);
			} catch (error) {
				throw new Error(`failed retriving key ${key}`);
			}
		}

		return config;
	}
}

export default (options) => {
	return new VaultGet(options);
};