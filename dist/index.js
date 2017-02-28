module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _getOwnPropertyDescriptor = __webpack_require__(1);
	
	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
	
	var _regenerator = __webpack_require__(2);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _promise = __webpack_require__(3);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _taggedTemplateLiteral2 = __webpack_require__(4);
	
	var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);
	
	var _asyncToGenerator2 = __webpack_require__(5);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(6);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(7);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _dec, _desc, _value, _class;
	
	var _templateObject = (0, _taggedTemplateLiteral3.default)(['fetching ', '.bold secrets from vault'], ['fetching ', '.bold secrets from vault']),
	    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['', '.dim ', '.bold'], ['', '.dim ', '.bold']),
	    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['', '.bold failed retriving key ', '.bold, are you sure it exists?\n', ''], ['', '.bold failed retriving key ', '.bold, are you sure it exists?\\n', '']);
	
	var _nodeVault = __webpack_require__(8);
	
	var _nodeVault2 = _interopRequireDefault(_nodeVault);
	
	var _traverse = __webpack_require__(9);
	
	var _traverse2 = _interopRequireDefault(_traverse);
	
	var _debug = __webpack_require__(10);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _templateColors = __webpack_require__(11);
	
	var _templateColors2 = _interopRequireDefault(_templateColors);
	
	var _rtry = __webpack_require__(12);
	
	var _rtry2 = _interopRequireDefault(_rtry);
	
	var _lodash = __webpack_require__(13);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;
	
		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}
	
		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);
	
		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}
	
		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}
	
		return desc;
	}
	
	var debug = (0, _debug2.default)('vault');
	
	var VaultGet = (_dec = (0, _rtry2.default)({ retries: 10, verbose: true }), (_class = function () {
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
			key: 'getValue',
			value: function () {
				var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(config) {
					var key, leafs, leafsToResolve, i, leaf;
					return _regenerator2.default.wrap(function _callee$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									config = _lodash2.default.clone(config);
	
									key = 0;
	
								case 2:
									if (!(key < this.keys.length)) {
										_context.next = 8;
										break;
									}
	
									_context.next = 5;
									return this.vault.unseal({ secret_shares: this.secretShares, key: this.keys[key] });
	
								case 5:
									key++;
									_context.next = 2;
									break;
	
								case 8:
									leafs = this.getTraversableLeafs(config), leafsToResolve = [];
	
	
									for (i = 0; i < leafs.length; i++) {
										leaf = leafs[i];
	
										leafsToResolve.push(this.resolveLeaf({ config: config, leaf: leaf }));
									}
	
									debug((0, _templateColors2.default)(_templateObject, leafsToResolve.length).green);
	
									_context.next = 13;
									return _promise2.default.all(leafsToResolve);
	
								case 13:
									return _context.abrupt('return', config);
	
								case 14:
								case 'end':
									return _context.stop();
							}
						}
					}, _callee, this);
				}));
	
				function getValue(_x) {
					return _ref.apply(this, arguments);
				}
	
				return getValue;
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
	}(), (_applyDecoratedDescriptor(_class.prototype, 'getValue', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'getValue'), _class.prototype)), _class));
	
	exports.default = function (options) {
		var vault = new VaultGet(options);
		return {
			get: vault.getValue.bind(vault)
		};
	};
	
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/object/get-own-property-descriptor");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/taggedTemplateLiteral");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("node-vault");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("traverse");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("template-colors");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("rtry");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjQzYTU0YmM5NGQzZjczNWUzYjQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibm9kZS12YXVsdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRyYXZlcnNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZGVidWdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0ZW1wbGF0ZS1jb2xvcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJydHJ5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibG9kYXNoXCIiXSwibmFtZXMiOlsiZGVidWciLCJWYXVsdEdldCIsInJldHJpZXMiLCJ2ZXJib3NlIiwiY29uZmlnIiwidmF1bHQiLCJhcGlWZXJzaW9uIiwiZW5kcG9pbnQiLCJ0b2tlbiIsImtleXMiLCJrZXkiLCJzZWNyZXRTaGFyZXMiLCJzZWNyZXRfc2hhcmVzIiwicm9vdFBhdGgiLCJvYmplY3QiLCJsZWFmcyIsImZvckVhY2giLCJpc0xlYWYiLCJwdXNoIiwiZ2V0IiwicGF0aCIsImNsb25lIiwibGVuZ3RoIiwidW5zZWFsIiwiZ2V0VHJhdmVyc2FibGVMZWFmcyIsImxlYWZzVG9SZXNvbHZlIiwiaSIsImxlYWYiLCJyZXNvbHZlTGVhZiIsImdyZWVuIiwiYWxsIiwicmVhZCIsImRhdGEiLCJzZXQiLCJ2YWx1ZSIsInN0YWNrIiwicmVkIiwidG9TdHJpbmciLCJvcHRpb25zIiwiZ2V0VmFsdWUiLCJiaW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxLQUFNQSxRQUFRLHFCQUFNLE9BQU4sQ0FBZDs7S0FFTUMsUSxXQXlCSixvQkFBSyxFQUFDQyxTQUFTLEVBQVYsRUFBY0MsU0FBUyxJQUF2QixFQUFMLEM7QUF4QkQsb0JBQWFDLE1BQWIsRUFBcUI7QUFBQTs7QUFDcEIsUUFBS0MsS0FBTCxHQUFhLHlCQUFNO0FBQ2xCQyxnQkFBWSxJQURNO0FBRWxCQyxjQUFVSCxPQUFPRyxRQUZDO0FBR2xCQyxXQUFPSixPQUFPSTtBQUhJLElBQU4sQ0FBYjs7QUFNQSxRQUFLQyxJQUFMLEdBQVlMLE9BQU9LLElBQVAsSUFBZUwsT0FBT00sR0FBdEIsR0FBNEJOLE9BQU9LLElBQVAsSUFBZSxDQUFDTCxPQUFPTSxHQUFSLENBQTNDLEdBQTBELEVBQXRFO0FBQ0EsUUFBS0MsWUFBTCxHQUFvQlAsT0FBT1EsYUFBUCxJQUF3QixDQUE1QztBQUNBLFFBQUtDLFFBQUwsR0FBZ0JULE9BQU9TLFFBQVAsSUFBbUIsUUFBbkM7QUFDQTs7Ozt1Q0FFb0JDLE0sRUFBUTtBQUM1QixRQUFJQyxRQUFRLEVBQVo7O0FBRUEsNEJBQVNELE1BQVQsRUFBaUJFLE9BQWpCLENBQXlCLFlBQVk7QUFDcEMsU0FBSSxLQUFLQyxNQUFULEVBQWlCO0FBQ2hCRixZQUFNRyxJQUFOLENBQVcsRUFBQ1IsS0FBSyx3QkFBU0ksTUFBVCxFQUFpQkssR0FBakIsQ0FBcUIsS0FBS0MsSUFBMUIsQ0FBTixFQUF1Q0EsTUFBTSxLQUFLQSxJQUFsRCxFQUFYO0FBQ0E7QUFDRCxLQUpEOztBQU1BLFdBQU9MLEtBQVA7QUFDQTs7OzsyRkFHZVgsTTs7Ozs7O0FBQ2ZBLGtCQUFTLGlCQUFFaUIsS0FBRixDQUFRakIsTUFBUixDQUFUOztBQUVTTSxZLEdBQU0sQzs7O2VBQUdBLE1BQU0sS0FBS0QsSUFBTCxDQUFVYSxNOzs7Ozs7Z0JBQzNCLEtBQUtqQixLQUFMLENBQVdrQixNQUFYLENBQWtCLEVBQUNYLGVBQWUsS0FBS0QsWUFBckIsRUFBbUNELEtBQUssS0FBS0QsSUFBTCxDQUFVQyxHQUFWLENBQXhDLEVBQWxCLEM7OztBQURtQ0EsYzs7Ozs7QUFJdENLLGMsR0FBUSxLQUFLUyxtQkFBTCxDQUF5QnBCLE1BQXpCLEMsRUFDWHFCLGMsR0FBaUIsRTs7O0FBRWxCLGNBQVNDLENBQVQsR0FBYSxDQUFiLEVBQWdCQSxJQUFJWCxNQUFNTyxNQUExQixFQUFrQ0ksR0FBbEMsRUFBdUM7QUFDbENDLGNBRGtDLEdBQzNCWixNQUFNVyxDQUFOLENBRDJCOztBQUV0Q0QseUJBQWVQLElBQWYsQ0FBb0IsS0FBS1UsV0FBTCxDQUFpQixFQUFDeEIsY0FBRCxFQUFTdUIsVUFBVCxFQUFqQixDQUFwQjtBQUNBOztBQUVEM0IsZUFBTSwrQ0FBYXlCLGVBQWVILE1BQTVCLEVBQTZETyxLQUFuRTs7O2dCQUVNLGtCQUFRQyxHQUFSLENBQVlMLGNBQVosQzs7OzBDQUVDckIsTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FHWUEsTSxTQUFBQSxNO1NBQVF1QixJLFNBQUFBLEk7Ozs7OztBQUNyQmpCLFksR0FBY2lCLEksQ0FBZGpCLEc7QUFBS1UsYSxHQUFTTyxJLENBQVRQLEk7OztnQkFHUSxLQUFLZixLQUFMLENBQVcwQixJQUFYLENBQW1CLEtBQUtsQixRQUF4QixTQUFvQ0gsR0FBcEMsQzs7O0FBQWRzQixhLGtCQUEwREEsSTs7QUFDOUQsaUNBQVM1QixNQUFULEVBQWlCNkIsR0FBakIsQ0FBcUJiLElBQXJCLEVBQTJCWSxLQUFLRSxLQUFMLElBQWNGLElBQXpDO0FBQ0FoQywrREFBVSxRQUFWLEVBQTBCVSxHQUExQjs7Ozs7Ozs7QUFFQSxzQkFBTXlCLEtBQU4sR0FBYyxnREFBSSxZQUFKLFFBQWtEekIsR0FBbEQsUUFBMkYsYUFBTXlCLEtBQWpHLEVBQXlHQyxHQUF6RyxDQUE2R0MsUUFBN0csRUFBZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQU1ZLFVBQUNDLE9BQUQsRUFBYTtBQUMzQixNQUFJakMsUUFBUSxJQUFJSixRQUFKLENBQWFxQyxPQUFiLENBQVo7QUFDQSxTQUFPO0FBQ05uQixRQUFLZCxNQUFNa0MsUUFBTixDQUFlQyxJQUFmLENBQW9CbkMsS0FBcEI7QUFEQyxHQUFQO0FBR0EsRTs7Ozs7Ozs7QUM1RUQsc0Y7Ozs7OztBQ0FBLHVEOzs7Ozs7QUNBQSwyRDs7Ozs7O0FDQUEseUU7Ozs7OztBQ0FBLG9FOzs7Ozs7QUNBQSxrRTs7Ozs7O0FDQUEsK0Q7Ozs7OztBQ0FBLHdDOzs7Ozs7QUNBQSxzQzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLDZDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEsb0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDY0M2E1NGJjOTRkM2Y3MzVlM2I0XG4gKiovIiwiaW1wb3J0IFZhdWx0IGZyb20gJ25vZGUtdmF1bHQnO1xuaW1wb3J0IHRyYXZlcnNlIGZyb20gJ3RyYXZlcnNlJztcbmltcG9ydCBEZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgYyBmcm9tICd0ZW1wbGF0ZS1jb2xvcnMnO1xuaW1wb3J0IHJ0cnkgZnJvbSAncnRyeSc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBkZWJ1ZyA9IERlYnVnKCd2YXVsdCcpO1xuXG5jbGFzcyBWYXVsdEdldCB7XG5cdGNvbnN0cnVjdG9yIChjb25maWcpIHtcblx0XHR0aGlzLnZhdWx0ID0gVmF1bHQoe1xuXHRcdFx0YXBpVmVyc2lvbjogJ3YxJyxcblx0XHRcdGVuZHBvaW50OiBjb25maWcuZW5kcG9pbnQsXG5cdFx0XHR0b2tlbjogY29uZmlnLnRva2VuXG5cdFx0fSk7XG5cblx0XHR0aGlzLmtleXMgPSBjb25maWcua2V5cyB8fCBjb25maWcua2V5ID8gY29uZmlnLmtleXMgfHwgW2NvbmZpZy5rZXldIDogW107XG5cdFx0dGhpcy5zZWNyZXRTaGFyZXMgPSBjb25maWcuc2VjcmV0X3NoYXJlcyB8fCAxO1xuXHRcdHRoaXMucm9vdFBhdGggPSBjb25maWcucm9vdFBhdGggfHwgJ3NlY3JldCc7XG5cdH1cblxuXHRnZXRUcmF2ZXJzYWJsZUxlYWZzIChvYmplY3QpIHtcblx0XHRsZXQgbGVhZnMgPSBbXTtcblxuXHRcdHRyYXZlcnNlKG9iamVjdCkuZm9yRWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodGhpcy5pc0xlYWYpIHtcblx0XHRcdFx0bGVhZnMucHVzaCh7a2V5OiB0cmF2ZXJzZShvYmplY3QpLmdldCh0aGlzLnBhdGgpLCBwYXRoOiB0aGlzLnBhdGh9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBsZWFmcztcblx0fVxuXG5cdEBydHJ5KHtyZXRyaWVzOiAxMCwgdmVyYm9zZTogdHJ1ZX0pXG5cdGFzeW5jIGdldFZhbHVlIChjb25maWcpIHtcblx0XHRjb25maWcgPSBfLmNsb25lKGNvbmZpZyk7XG5cblx0XHRmb3IgKGxldCBrZXkgPSAwOyBrZXkgPCB0aGlzLmtleXMubGVuZ3RoOyBrZXkrKykge1xuXHRcdFx0YXdhaXQgdGhpcy52YXVsdC51bnNlYWwoe3NlY3JldF9zaGFyZXM6IHRoaXMuc2VjcmV0U2hhcmVzLCBrZXk6IHRoaXMua2V5c1trZXldfSk7XG5cdFx0fVxuXG5cdFx0bGV0IGxlYWZzID0gdGhpcy5nZXRUcmF2ZXJzYWJsZUxlYWZzKGNvbmZpZyksXG5cdFx0XHRsZWFmc1RvUmVzb2x2ZSA9IFtdO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZWFmcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IGxlYWYgPSBsZWFmc1tpXTtcblx0XHRcdGxlYWZzVG9SZXNvbHZlLnB1c2godGhpcy5yZXNvbHZlTGVhZih7Y29uZmlnLCBsZWFmfSkpO1xuXHRcdH1cblxuXHRcdGRlYnVnKGNgZmV0Y2hpbmcgJHtsZWFmc1RvUmVzb2x2ZS5sZW5ndGh9LmJvbGQgc2VjcmV0cyBmcm9tIHZhdWx0YC5ncmVlbik7XG5cblx0XHRhd2FpdCBQcm9taXNlLmFsbChsZWFmc1RvUmVzb2x2ZSk7XG5cblx0XHRyZXR1cm4gY29uZmlnO1xuXHR9XG5cblx0YXN5bmMgcmVzb2x2ZUxlYWYgKHtjb25maWcsIGxlYWZ9KSB7XG5cdFx0bGV0IHsga2V5LCBwYXRoIH0gPSBsZWFmO1xuXG5cdFx0dHJ5IHtcblx0XHRcdGxldCBkYXRhID0gKGF3YWl0IHRoaXMudmF1bHQucmVhZChgJHt0aGlzLnJvb3RQYXRofS8ke2tleX1gKSkuZGF0YTtcblx0XHRcdHRyYXZlcnNlKGNvbmZpZykuc2V0KHBhdGgsIGRhdGEudmFsdWUgfHwgZGF0YSk7XG5cdFx0XHRkZWJ1ZyhjYCR7J2xvYWRlZCd9LmRpbSAke2tleX0uYm9sZGApO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRlcnJvci5zdGFjayA9IGNgJHsndmF1bHQtZ2V0Oid9LmJvbGQgZmFpbGVkIHJldHJpdmluZyBrZXkgJHtgXCIke2tleX1cImB9LmJvbGQsIGFyZSB5b3Ugc3VyZSBpdCBleGlzdHM/XFxuJHtlcnJvci5zdGFja31gLnJlZC50b1N0cmluZygpO1xuXHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IChvcHRpb25zKSA9PiB7XG5cdGxldCB2YXVsdCA9IG5ldyBWYXVsdEdldChvcHRpb25zKTtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IHZhdWx0LmdldFZhbHVlLmJpbmQodmF1bHQpXG5cdH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIlxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90YWdnZWRUZW1wbGF0ZUxpdGVyYWxcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90YWdnZWRUZW1wbGF0ZUxpdGVyYWxcIlxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIlxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLXZhdWx0XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJub2RlLXZhdWx0XCJcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0cmF2ZXJzZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwidHJhdmVyc2VcIlxuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlYnVnXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJkZWJ1Z1wiXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRlbXBsYXRlLWNvbG9yc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwidGVtcGxhdGUtY29sb3JzXCJcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnRyeVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicnRyeVwiXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwibG9kYXNoXCJcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==