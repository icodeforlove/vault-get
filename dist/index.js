'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['fetching ', '.bold secrets from vault'], ['fetching ', '.bold secrets from vault']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['', '.dim ', '.bold'], ['', '.dim ', '.bold']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['', '.bold failed retriving key ', '.bold, are you sure it exists?\n', ''], ['', '.bold failed retriving key ', '.bold, are you sure it exists?\\n', '']);

var _nodeVault = require('node-vault');

var _nodeVault2 = _interopRequireDefault(_nodeVault);

var _traverse = require('traverse');

var _traverse2 = _interopRequireDefault(_traverse);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _templateColors = require('template-colors');

var _templateColors2 = _interopRequireDefault(_templateColors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug2.default)('vault');

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
				var key, leafs, leafsToResolve, i, leaf;
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
								leafs = this.getTraversableLeafs(config), leafsToResolve = [];


								for (i = 0; i < leafs.length; i++) {
									leaf = leafs[i];

									leafsToResolve.push(this.resolveLeaf({ config: config, leaf: leaf }));
								}

								debug((0, _templateColors2.default)(_templateObject, leafsToResolve.length).green);

								_context.next = 12;
								return _promise2.default.all(leafsToResolve);

							case 12:
								return _context.abrupt('return', config);

							case 13:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function get(_x) {
				return _ref.apply(this, arguments);
			}

			return get;
		}()
	}, {
		key: 'resolveLeaf',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref3) {
				var config = _ref3.config;
				var leaf = _ref3.leaf;
				var key, path, data;
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								key = leaf.key;
								path = leaf.path;
								_context2.prev = 2;
								_context2.next = 5;
								return this.vault.read(this.rootPath + '/' + key);

							case 5:
								data = _context2.sent.data;

								(0, _traverse2.default)(config).set(path, data.value || data);
								debug((0, _templateColors2.default)(_templateObject2, 'loaded', key));
								_context2.next = 14;
								break;

							case 10:
								_context2.prev = 10;
								_context2.t0 = _context2['catch'](2);

								_context2.t0.stack = (0, _templateColors2.default)(_templateObject3, 'vault-get:', '"' + key + '"', _context2.t0.stack).red.toString();
								throw _context2.t0;

							case 14:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this, [[2, 10]]);
			}));

			function resolveLeaf(_x2) {
				return _ref2.apply(this, arguments);
			}

			return resolveLeaf;
		}()
	}]);
	return VaultGet;
}();

exports.default = function (options) {
	return new VaultGet(options);
};

module.exports = exports['default'];