# value-get

makes accessing hashicorp vault data a pleasure

## install

```
npm install vault-get
```

## usage

simple usage

```
import VaultGet from 'vault-get';

let vault = VaultGet({
	endpoint: '...', // (required)
	token: '...', // (required)
	key: '...', // or keys: ['...', '...', '...'] (optional)
	rootPath: 'secret' // (optional, default is secret)
});

let config = await vault.get({
	host: 'mysite.com/databases/master/host',
	username: 'mysite.com/databases/master/username',
	password: 'mysite.com/databases/master/password'
});

console.log(config);
```

nested usage

```
let databases = await vault.get({
	production: {
		host: 'mysite.com/databases/production/host',
		username: 'mysite.com/databases/production/username',
		password: 'mysite.com/databases/production/password'
	},
	development: {
		host: 'mysite.com/databases/development/host',
		username: 'mysite.com/databases/development/username',
		password: 'mysite.com/databases/development/password'
	}
});

```

## debugging

```javascript
DEBUG=vault ...
```
