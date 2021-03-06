import Vault from 'node-vault';
import traverse from 'traverse';
import Debug from 'debug';
import c from 'template-colors';
import atmpt from 'atmpt';

const debug = Debug('vault');

class VaultGet {
	constructor (config) {
		this.vault = Vault({
			apiVersion: 'v1',
			endpoint: config.endpoint,
			token: config.token
		});

		this.keys = config.keys || config.key ? config.keys || [config.key] : [];
		this.secretShares = config.secret_shares || 1;
		this.rootPath = config.rootPath || 'secret';
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

	async getValue (config) {
		for (let key = 0; key < this.keys.length; key++) {
			await this.vault.unseal({secret_shares: this.secretShares, key: this.keys[key]});
		}

		let leafs = this.getTraversableLeafs(config),
			leafsToResolve = [];

		for (let i = 0; i < leafs.length; i++) {
			let leaf = leafs[i];
			leafsToResolve.push(this.resolveLeaf({config, leaf}));
		}

		debug(c`fetching ${leafsToResolve.length}.bold secrets from vault`.green.toString());

		await Promise.all(leafsToResolve);

		return config;
	}

	async resolveLeaf ({config, leaf}) {
		return await atmpt(async attempt => {
			let { key, path } = leaf;

			if (attempt) {
				debug(`retry #${attempt}: ${this.rootPath}/${key}`);
			}

			try {
				let data = (await this.vault.read(`${this.rootPath}/${key}`)).data;
				traverse(config).set(path, data.value || data);
				debug(c`${'loaded'}.dim ${key}.bold`.toString());
			} catch (error) {
				error.stack = c`${'vault-get:'}.bold failed retriving key ${`"${key}"`}.bold, are you sure it exists?\n${error.stack}`.red.toString();
				throw error;
			}
		}, {maxAttempts: 10, delay: attempt => attempt * 1000});
	}
}

export default (options) => {
	let vault = new VaultGet(options);
	return {
		get: vault.getValue.bind(vault)
	};
};