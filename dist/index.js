'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodeVault = require('node-vault');

var _nodeVault2 = _interopRequireDefault(_nodeVault);

var _traverse = require('traverse');

var _traverse2 = _interopRequireDefault(_traverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VaultGet = function () {
	function VaultGet(config) {
		(0, _classCallCheck3.default)(this, VaultGet);

		this.vault = (0, _nodeVault2.default)({
			apiVersion: 'v1',
			endpoint: config.endpoint,
			token: config.token
		});

		this.keys = config.keys || config.key ? config.keys || [config.key] : [];
		this.secretShares = config.secret_shares || 1;
		this.rootPath = config.rootPath || 'secret';
	}

	(0, _createClass3.default)(VaultGet, [{
		key: 'getTraversableLeafs',
		value: function getTraversableLeafs(object) {
			var leafs = [];

			(0, _traverse2.default)(object).forEach(function () {
				if (this.isLeaf) {
					leafs.push({ key: (0, _traverse2.default)(object).get(this.path), path: this.path });
				}
			});

			return leafs;
		}
	}, {
		key: 'get',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(config) {
				var key, leafs, leaf, _leafs$leaf, _key, path;

				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								key = 0;

							case 1:
								if (!(key < this.keys.length)) {
									_context.next = 7;
									break;
								}

								_context.next = 4;
								return this.vault.unseal({ secret_shares: this.secretShares, key: this.keys[key] });

							case 4:
								key++;
								_context.next = 1;
								break;

							case 7:
								leafs = this.getTraversableLeafs(config);
								leaf = 0;

							case 9:
								if (!(leaf < leafs.length)) {
									_context.next = 28;
									break;
								}

								_leafs$leaf = leafs[leaf];
								_key = _leafs$leaf.key;
								path = _leafs$leaf.path;
								_context.prev = 13;
								_context.t0 = (0, _traverse2.default)(config);
								_context.t1 = path;
								_context.next = 18;
								return this.vault.read(this.rootPath + '/' + _key);

							case 18:
								_context.t2 = _context.sent.data;

								_context.t0.set.call(_context.t0, _context.t1, _context.t2);

								_context.next = 25;
								break;

							case 22:
								_context.prev = 22;
								_context.t3 = _context['catch'](13);
								throw new Error('failed retriving key ' + _key);

							case 25:
								leaf++;
								_context.next = 9;
								break;

							case 28:
								return _context.abrupt('return', config);

							case 29:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this, [[13, 22]]);
			}));

			function get(_x) {
				return _ref.apply(this, arguments);
			}

			return get;
		}()
	}]);
	return VaultGet;
}();

exports.default = function (options) {
	return new VaultGet(options);
};

module.exports = exports['default'];