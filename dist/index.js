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
	
	var VaultGet = (_dec = (0, _rtry2.default)({ retries: 10, beforeRetry: function beforeRetry(_ref) {
			var error = _ref.error;
			return debug(error.stack);
		} }), (_class = function () {
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
				var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(config) {
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
	
									debug((0, _templateColors2.default)(_templateObject, leafsToResolve.length).green.toString());
	
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
	
				function getValue(_x) {
					return _ref2.apply(this, arguments);
				}
	
				return getValue;
			}()
		}, {
			key: 'resolveLeaf',
			value: function () {
				var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
					var config = _ref4.config,
					    leaf = _ref4.leaf;
					var key, path, data;
					return _regenerator2.default.wrap(function _callee2$(_context2) {
						while (1) {
							switch (_context2.prev = _context2.next) {
								case 0:
									key = leaf.key, path = leaf.path;
									_context2.prev = 1;
									_context2.next = 4;
									return this.vault.read(this.rootPath + '/' + key);
	
								case 4:
									data = _context2.sent.data;
	
									(0, _traverse2.default)(config).set(path, data.value || data);
									debug((0, _templateColors2.default)(_templateObject2, 'loaded', key).toString());
									_context2.next = 13;
									break;
	
								case 9:
									_context2.prev = 9;
									_context2.t0 = _context2['catch'](1);
	
									_context2.t0.stack = (0, _templateColors2.default)(_templateObject3, 'vault-get:', '"' + key + '"', _context2.t0.stack).red.toString();
									throw _context2.t0;
	
								case 13:
								case 'end':
									return _context2.stop();
							}
						}
					}, _callee2, this, [[1, 9]]);
				}));
	
				function resolveLeaf(_x2) {
					return _ref3.apply(this, arguments);
				}
	
				return resolveLeaf;
			}()
		}]);
		return VaultGet;
	}(), (_applyDecoratedDescriptor(_class.prototype, 'resolveLeaf', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'resolveLeaf'), _class.prototype)), _class));
	
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWRkYTE5MGNlYWE5MzA4Zjg3ZjAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibm9kZS12YXVsdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRyYXZlcnNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZGVidWdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0ZW1wbGF0ZS1jb2xvcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJydHJ5XCIiXSwibmFtZXMiOlsiZGVidWciLCJWYXVsdEdldCIsInJldHJpZXMiLCJiZWZvcmVSZXRyeSIsImVycm9yIiwic3RhY2siLCJjb25maWciLCJ2YXVsdCIsImFwaVZlcnNpb24iLCJlbmRwb2ludCIsInRva2VuIiwia2V5cyIsImtleSIsInNlY3JldFNoYXJlcyIsInNlY3JldF9zaGFyZXMiLCJyb290UGF0aCIsIm9iamVjdCIsImxlYWZzIiwiZm9yRWFjaCIsImlzTGVhZiIsInB1c2giLCJnZXQiLCJwYXRoIiwibGVuZ3RoIiwidW5zZWFsIiwiZ2V0VHJhdmVyc2FibGVMZWFmcyIsImxlYWZzVG9SZXNvbHZlIiwiaSIsImxlYWYiLCJyZXNvbHZlTGVhZiIsImdyZWVuIiwidG9TdHJpbmciLCJhbGwiLCJyZWFkIiwiZGF0YSIsInNldCIsInZhbHVlIiwicmVkIiwib3B0aW9ucyIsImdldFZhbHVlIiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLEtBQU1BLFFBQVEscUJBQU0sT0FBTixDQUFkOztLQUVNQyxRLFdBNkNKLG9CQUFLLEVBQUNDLFNBQVMsRUFBVixFQUFlQyxhQUFhO0FBQUEsT0FBRUMsS0FBRixRQUFFQSxLQUFGO0FBQUEsVUFBYUosTUFBTUksTUFBTUMsS0FBWixDQUFiO0FBQUEsR0FBNUIsRUFBTCxDO0FBNUNELG9CQUFhQyxNQUFiLEVBQXFCO0FBQUE7O0FBQ3BCLFFBQUtDLEtBQUwsR0FBYSx5QkFBTTtBQUNsQkMsZ0JBQVksSUFETTtBQUVsQkMsY0FBVUgsT0FBT0csUUFGQztBQUdsQkMsV0FBT0osT0FBT0k7QUFISSxJQUFOLENBQWI7O0FBTUEsUUFBS0MsSUFBTCxHQUFZTCxPQUFPSyxJQUFQLElBQWVMLE9BQU9NLEdBQXRCLEdBQTRCTixPQUFPSyxJQUFQLElBQWUsQ0FBQ0wsT0FBT00sR0FBUixDQUEzQyxHQUEwRCxFQUF0RTtBQUNBLFFBQUtDLFlBQUwsR0FBb0JQLE9BQU9RLGFBQVAsSUFBd0IsQ0FBNUM7QUFDQSxRQUFLQyxRQUFMLEdBQWdCVCxPQUFPUyxRQUFQLElBQW1CLFFBQW5DO0FBQ0E7Ozs7dUNBRW9CQyxNLEVBQVE7QUFDNUIsUUFBSUMsUUFBUSxFQUFaOztBQUVBLDRCQUFTRCxNQUFULEVBQWlCRSxPQUFqQixDQUF5QixZQUFZO0FBQ3BDLFNBQUksS0FBS0MsTUFBVCxFQUFpQjtBQUNoQkYsWUFBTUcsSUFBTixDQUFXLEVBQUNSLEtBQUssd0JBQVNJLE1BQVQsRUFBaUJLLEdBQWpCLENBQXFCLEtBQUtDLElBQTFCLENBQU4sRUFBdUNBLE1BQU0sS0FBS0EsSUFBbEQsRUFBWDtBQUNBO0FBQ0QsS0FKRDs7QUFNQSxXQUFPTCxLQUFQO0FBQ0E7Ozs7MEdBRWVYLE07Ozs7OztBQUNOTSxZLEdBQU0sQzs7O2VBQUdBLE1BQU0sS0FBS0QsSUFBTCxDQUFVWSxNOzs7Ozs7Z0JBQzNCLEtBQUtoQixLQUFMLENBQVdpQixNQUFYLENBQWtCLEVBQUNWLGVBQWUsS0FBS0QsWUFBckIsRUFBbUNELEtBQUssS0FBS0QsSUFBTCxDQUFVQyxHQUFWLENBQXhDLEVBQWxCLEM7OztBQURtQ0EsYzs7Ozs7QUFJdENLLGMsR0FBUSxLQUFLUSxtQkFBTCxDQUF5Qm5CLE1BQXpCLEMsRUFDWG9CLGMsR0FBaUIsRTs7O0FBRWxCLGNBQVNDLENBQVQsR0FBYSxDQUFiLEVBQWdCQSxJQUFJVixNQUFNTSxNQUExQixFQUFrQ0ksR0FBbEMsRUFBdUM7QUFDbENDLGNBRGtDLEdBQzNCWCxNQUFNVSxDQUFOLENBRDJCOztBQUV0Q0QseUJBQWVOLElBQWYsQ0FBb0IsS0FBS1MsV0FBTCxDQUFpQixFQUFDdkIsY0FBRCxFQUFTc0IsVUFBVCxFQUFqQixDQUFwQjtBQUNBOztBQUVENUIsZUFBTSwrQ0FBYTBCLGVBQWVILE1BQTVCLEVBQTZETyxLQUE3RCxDQUFtRUMsUUFBbkUsRUFBTjs7O2dCQUVNLGtCQUFRQyxHQUFSLENBQVlOLGNBQVosQzs7OzBDQUVDcEIsTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FJWUEsTSxTQUFBQSxNO1NBQVFzQixJLFNBQUFBLEk7Ozs7OztBQUNyQmhCLFksR0FBY2dCLEksQ0FBZGhCLEcsRUFBS1UsSSxHQUFTTSxJLENBQVROLEk7OztnQkFHUSxLQUFLZixLQUFMLENBQVcwQixJQUFYLENBQW1CLEtBQUtsQixRQUF4QixTQUFvQ0gsR0FBcEMsQzs7O0FBQWRzQixhLGtCQUEwREEsSTs7QUFDOUQsaUNBQVM1QixNQUFULEVBQWlCNkIsR0FBakIsQ0FBcUJiLElBQXJCLEVBQTJCWSxLQUFLRSxLQUFMLElBQWNGLElBQXpDO0FBQ0FsQyxlQUFNLGdEQUFJLFFBQUosRUFBb0JZLEdBQXBCLEVBQStCbUIsUUFBL0IsRUFBTjs7Ozs7Ozs7QUFFQSxzQkFBTTFCLEtBQU4sR0FBYyxnREFBSSxZQUFKLFFBQWtETyxHQUFsRCxRQUEyRixhQUFNUCxLQUFqRyxFQUF5R2dDLEdBQXpHLENBQTZHTixRQUE3RyxFQUFkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBTVksVUFBQ08sT0FBRCxFQUFhO0FBQzNCLE1BQUkvQixRQUFRLElBQUlOLFFBQUosQ0FBYXFDLE9BQWIsQ0FBWjtBQUNBLFNBQU87QUFDTmpCLFFBQUtkLE1BQU1nQyxRQUFOLENBQWVDLElBQWYsQ0FBb0JqQyxLQUFwQjtBQURDLEdBQVA7QUFHQSxFOzs7Ozs7OztBQ3pFRCxzRjs7Ozs7O0FDQUEsdUQ7Ozs7OztBQ0FBLDJEOzs7Ozs7QUNBQSx5RTs7Ozs7O0FDQUEsb0U7Ozs7OztBQ0FBLGtFOzs7Ozs7QUNBQSwrRDs7Ozs7O0FDQUEsd0M7Ozs7OztBQ0FBLHNDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsNkM7Ozs7OztBQ0FBLGtDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxZGRhMTkwY2VhYTkzMDhmODdmMFxuICoqLyIsImltcG9ydCBWYXVsdCBmcm9tICdub2RlLXZhdWx0JztcbmltcG9ydCB0cmF2ZXJzZSBmcm9tICd0cmF2ZXJzZSc7XG5pbXBvcnQgRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGMgZnJvbSAndGVtcGxhdGUtY29sb3JzJztcbmltcG9ydCBydHJ5IGZyb20gJ3J0cnknO1xuXG5jb25zdCBkZWJ1ZyA9IERlYnVnKCd2YXVsdCcpO1xuXG5jbGFzcyBWYXVsdEdldCB7XG5cdGNvbnN0cnVjdG9yIChjb25maWcpIHtcblx0XHR0aGlzLnZhdWx0ID0gVmF1bHQoe1xuXHRcdFx0YXBpVmVyc2lvbjogJ3YxJyxcblx0XHRcdGVuZHBvaW50OiBjb25maWcuZW5kcG9pbnQsXG5cdFx0XHR0b2tlbjogY29uZmlnLnRva2VuXG5cdFx0fSk7XG5cblx0XHR0aGlzLmtleXMgPSBjb25maWcua2V5cyB8fCBjb25maWcua2V5ID8gY29uZmlnLmtleXMgfHwgW2NvbmZpZy5rZXldIDogW107XG5cdFx0dGhpcy5zZWNyZXRTaGFyZXMgPSBjb25maWcuc2VjcmV0X3NoYXJlcyB8fCAxO1xuXHRcdHRoaXMucm9vdFBhdGggPSBjb25maWcucm9vdFBhdGggfHwgJ3NlY3JldCc7XG5cdH1cblxuXHRnZXRUcmF2ZXJzYWJsZUxlYWZzIChvYmplY3QpIHtcblx0XHRsZXQgbGVhZnMgPSBbXTtcblxuXHRcdHRyYXZlcnNlKG9iamVjdCkuZm9yRWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAodGhpcy5pc0xlYWYpIHtcblx0XHRcdFx0bGVhZnMucHVzaCh7a2V5OiB0cmF2ZXJzZShvYmplY3QpLmdldCh0aGlzLnBhdGgpLCBwYXRoOiB0aGlzLnBhdGh9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiBsZWFmcztcblx0fVxuXG5cdGFzeW5jIGdldFZhbHVlIChjb25maWcpIHtcblx0XHRmb3IgKGxldCBrZXkgPSAwOyBrZXkgPCB0aGlzLmtleXMubGVuZ3RoOyBrZXkrKykge1xuXHRcdFx0YXdhaXQgdGhpcy52YXVsdC51bnNlYWwoe3NlY3JldF9zaGFyZXM6IHRoaXMuc2VjcmV0U2hhcmVzLCBrZXk6IHRoaXMua2V5c1trZXldfSk7XG5cdFx0fVxuXG5cdFx0bGV0IGxlYWZzID0gdGhpcy5nZXRUcmF2ZXJzYWJsZUxlYWZzKGNvbmZpZyksXG5cdFx0XHRsZWFmc1RvUmVzb2x2ZSA9IFtdO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsZWFmcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0bGV0IGxlYWYgPSBsZWFmc1tpXTtcblx0XHRcdGxlYWZzVG9SZXNvbHZlLnB1c2godGhpcy5yZXNvbHZlTGVhZih7Y29uZmlnLCBsZWFmfSkpO1xuXHRcdH1cblxuXHRcdGRlYnVnKGNgZmV0Y2hpbmcgJHtsZWFmc1RvUmVzb2x2ZS5sZW5ndGh9LmJvbGQgc2VjcmV0cyBmcm9tIHZhdWx0YC5ncmVlbi50b1N0cmluZygpKTtcblxuXHRcdGF3YWl0IFByb21pc2UuYWxsKGxlYWZzVG9SZXNvbHZlKTtcblxuXHRcdHJldHVybiBjb25maWc7XG5cdH1cblxuXHRAcnRyeSh7cmV0cmllczogMTAsICBiZWZvcmVSZXRyeTogKHtlcnJvcn0pID0+IGRlYnVnKGVycm9yLnN0YWNrKX0pXG5cdGFzeW5jIHJlc29sdmVMZWFmICh7Y29uZmlnLCBsZWFmfSkge1xuXHRcdGxldCB7IGtleSwgcGF0aCB9ID0gbGVhZjtcblxuXHRcdHRyeSB7XG5cdFx0XHRsZXQgZGF0YSA9IChhd2FpdCB0aGlzLnZhdWx0LnJlYWQoYCR7dGhpcy5yb290UGF0aH0vJHtrZXl9YCkpLmRhdGE7XG5cdFx0XHR0cmF2ZXJzZShjb25maWcpLnNldChwYXRoLCBkYXRhLnZhbHVlIHx8IGRhdGEpO1xuXHRcdFx0ZGVidWcoY2Akeydsb2FkZWQnfS5kaW0gJHtrZXl9LmJvbGRgLnRvU3RyaW5nKCkpO1xuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRlcnJvci5zdGFjayA9IGNgJHsndmF1bHQtZ2V0Oid9LmJvbGQgZmFpbGVkIHJldHJpdmluZyBrZXkgJHtgXCIke2tleX1cImB9LmJvbGQsIGFyZSB5b3Ugc3VyZSBpdCBleGlzdHM/XFxuJHtlcnJvci5zdGFja31gLnJlZC50b1N0cmluZygpO1xuXHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IChvcHRpb25zKSA9PiB7XG5cdGxldCB2YXVsdCA9IG5ldyBWYXVsdEdldChvcHRpb25zKTtcblx0cmV0dXJuIHtcblx0XHRnZXQ6IHZhdWx0LmdldFZhbHVlLmJpbmQodmF1bHQpXG5cdH07XG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCJcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIlxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90YWdnZWRUZW1wbGF0ZUxpdGVyYWxcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90YWdnZWRUZW1wbGF0ZUxpdGVyYWxcIlxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIlxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLXZhdWx0XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJub2RlLXZhdWx0XCJcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0cmF2ZXJzZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwidHJhdmVyc2VcIlxuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlYnVnXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJkZWJ1Z1wiXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRlbXBsYXRlLWNvbG9yc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwidGVtcGxhdGUtY29sb3JzXCJcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicnRyeVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwicnRyeVwiXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=