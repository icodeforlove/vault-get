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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTdlMTBkYTI5ZjQxYjI1YjI1YTEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9yZWdlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibm9kZS12YXVsdFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRyYXZlcnNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZGVidWdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0ZW1wbGF0ZS1jb2xvcnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJydHJ5XCIiXSwibmFtZXMiOlsiZGVidWciLCJWYXVsdEdldCIsInJldHJpZXMiLCJ2ZXJib3NlIiwiY29uZmlnIiwidmF1bHQiLCJhcGlWZXJzaW9uIiwiZW5kcG9pbnQiLCJ0b2tlbiIsImtleXMiLCJrZXkiLCJzZWNyZXRTaGFyZXMiLCJzZWNyZXRfc2hhcmVzIiwicm9vdFBhdGgiLCJvYmplY3QiLCJsZWFmcyIsImZvckVhY2giLCJpc0xlYWYiLCJwdXNoIiwiZ2V0IiwicGF0aCIsImxlbmd0aCIsInVuc2VhbCIsImdldFRyYXZlcnNhYmxlTGVhZnMiLCJsZWFmc1RvUmVzb2x2ZSIsImkiLCJsZWFmIiwicmVzb2x2ZUxlYWYiLCJncmVlbiIsImFsbCIsInJlYWQiLCJkYXRhIiwic2V0IiwidmFsdWUiLCJzdGFjayIsInJlZCIsInRvU3RyaW5nIiwib3B0aW9ucyIsImdldFZhbHVlIiwiYmluZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLEtBQU1BLFFBQVEscUJBQU0sT0FBTixDQUFkOztLQUVNQyxRLFdBNkNKLG9CQUFLLEVBQUNDLFNBQVMsRUFBVixFQUFjQyxTQUFTLElBQXZCLEVBQUwsQztBQTVDRCxvQkFBYUMsTUFBYixFQUFxQjtBQUFBOztBQUNwQixRQUFLQyxLQUFMLEdBQWEseUJBQU07QUFDbEJDLGdCQUFZLElBRE07QUFFbEJDLGNBQVVILE9BQU9HLFFBRkM7QUFHbEJDLFdBQU9KLE9BQU9JO0FBSEksSUFBTixDQUFiOztBQU1BLFFBQUtDLElBQUwsR0FBWUwsT0FBT0ssSUFBUCxJQUFlTCxPQUFPTSxHQUF0QixHQUE0Qk4sT0FBT0ssSUFBUCxJQUFlLENBQUNMLE9BQU9NLEdBQVIsQ0FBM0MsR0FBMEQsRUFBdEU7QUFDQSxRQUFLQyxZQUFMLEdBQW9CUCxPQUFPUSxhQUFQLElBQXdCLENBQTVDO0FBQ0EsUUFBS0MsUUFBTCxHQUFnQlQsT0FBT1MsUUFBUCxJQUFtQixRQUFuQztBQUNBOzs7O3VDQUVvQkMsTSxFQUFRO0FBQzVCLFFBQUlDLFFBQVEsRUFBWjs7QUFFQSw0QkFBU0QsTUFBVCxFQUFpQkUsT0FBakIsQ0FBeUIsWUFBWTtBQUNwQyxTQUFJLEtBQUtDLE1BQVQsRUFBaUI7QUFDaEJGLFlBQU1HLElBQU4sQ0FBVyxFQUFDUixLQUFLLHdCQUFTSSxNQUFULEVBQWlCSyxHQUFqQixDQUFxQixLQUFLQyxJQUExQixDQUFOLEVBQXVDQSxNQUFNLEtBQUtBLElBQWxELEVBQVg7QUFDQTtBQUNELEtBSkQ7O0FBTUEsV0FBT0wsS0FBUDtBQUNBOzs7OzJGQUVlWCxNOzs7Ozs7QUFDTk0sWSxHQUFNLEM7OztlQUFHQSxNQUFNLEtBQUtELElBQUwsQ0FBVVksTTs7Ozs7O2dCQUMzQixLQUFLaEIsS0FBTCxDQUFXaUIsTUFBWCxDQUFrQixFQUFDVixlQUFlLEtBQUtELFlBQXJCLEVBQW1DRCxLQUFLLEtBQUtELElBQUwsQ0FBVUMsR0FBVixDQUF4QyxFQUFsQixDOzs7QUFEbUNBLGM7Ozs7O0FBSXRDSyxjLEdBQVEsS0FBS1EsbUJBQUwsQ0FBeUJuQixNQUF6QixDLEVBQ1hvQixjLEdBQWlCLEU7OztBQUVsQixjQUFTQyxDQUFULEdBQWEsQ0FBYixFQUFnQkEsSUFBSVYsTUFBTU0sTUFBMUIsRUFBa0NJLEdBQWxDLEVBQXVDO0FBQ2xDQyxjQURrQyxHQUMzQlgsTUFBTVUsQ0FBTixDQUQyQjs7QUFFdENELHlCQUFlTixJQUFmLENBQW9CLEtBQUtTLFdBQUwsQ0FBaUIsRUFBQ3ZCLGNBQUQsRUFBU3NCLFVBQVQsRUFBakIsQ0FBcEI7QUFDQTs7QUFFRDFCLGVBQU0sK0NBQWF3QixlQUFlSCxNQUE1QixFQUE2RE8sS0FBbkU7OztnQkFFTSxrQkFBUUMsR0FBUixDQUFZTCxjQUFaLEM7OzswQ0FFQ3BCLE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBSVlBLE0sU0FBQUEsTTtTQUFRc0IsSSxTQUFBQSxJOzs7Ozs7QUFDckJoQixZLEdBQWNnQixJLENBQWRoQixHO0FBQUtVLGEsR0FBU00sSSxDQUFUTixJOzs7Z0JBR1EsS0FBS2YsS0FBTCxDQUFXeUIsSUFBWCxDQUFtQixLQUFLakIsUUFBeEIsU0FBb0NILEdBQXBDLEM7OztBQUFkcUIsYSxrQkFBMERBLEk7O0FBQzlELGlDQUFTM0IsTUFBVCxFQUFpQjRCLEdBQWpCLENBQXFCWixJQUFyQixFQUEyQlcsS0FBS0UsS0FBTCxJQUFjRixJQUF6QztBQUNBL0IsK0RBQVUsUUFBVixFQUEwQlUsR0FBMUI7Ozs7Ozs7O0FBRUEsc0JBQU13QixLQUFOLEdBQWMsZ0RBQUksWUFBSixRQUFrRHhCLEdBQWxELFFBQTJGLGFBQU13QixLQUFqRyxFQUF5R0MsR0FBekcsQ0FBNkdDLFFBQTdHLEVBQWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFNWSxVQUFDQyxPQUFELEVBQWE7QUFDM0IsTUFBSWhDLFFBQVEsSUFBSUosUUFBSixDQUFhb0MsT0FBYixDQUFaO0FBQ0EsU0FBTztBQUNObEIsUUFBS2QsTUFBTWlDLFFBQU4sQ0FBZUMsSUFBZixDQUFvQmxDLEtBQXBCO0FBREMsR0FBUDtBQUdBLEU7Ozs7Ozs7O0FDekVELHNGOzs7Ozs7QUNBQSx1RDs7Ozs7O0FDQUEsMkQ7Ozs7OztBQ0FBLHlFOzs7Ozs7QUNBQSxvRTs7Ozs7O0FDQUEsa0U7Ozs7OztBQ0FBLCtEOzs7Ozs7QUNBQSx3Qzs7Ozs7O0FDQUEsc0M7Ozs7OztBQ0FBLG1DOzs7Ozs7QUNBQSw2Qzs7Ozs7O0FDQUEsa0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGE3ZTEwZGEyOWY0MWIyNWIyNWExXG4gKiovIiwiaW1wb3J0IFZhdWx0IGZyb20gJ25vZGUtdmF1bHQnO1xuaW1wb3J0IHRyYXZlcnNlIGZyb20gJ3RyYXZlcnNlJztcbmltcG9ydCBEZWJ1ZyBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgYyBmcm9tICd0ZW1wbGF0ZS1jb2xvcnMnO1xuaW1wb3J0IHJ0cnkgZnJvbSAncnRyeSc7XG5cbmNvbnN0IGRlYnVnID0gRGVidWcoJ3ZhdWx0Jyk7XG5cbmNsYXNzIFZhdWx0R2V0IHtcblx0Y29uc3RydWN0b3IgKGNvbmZpZykge1xuXHRcdHRoaXMudmF1bHQgPSBWYXVsdCh7XG5cdFx0XHRhcGlWZXJzaW9uOiAndjEnLFxuXHRcdFx0ZW5kcG9pbnQ6IGNvbmZpZy5lbmRwb2ludCxcblx0XHRcdHRva2VuOiBjb25maWcudG9rZW5cblx0XHR9KTtcblxuXHRcdHRoaXMua2V5cyA9IGNvbmZpZy5rZXlzIHx8IGNvbmZpZy5rZXkgPyBjb25maWcua2V5cyB8fCBbY29uZmlnLmtleV0gOiBbXTtcblx0XHR0aGlzLnNlY3JldFNoYXJlcyA9IGNvbmZpZy5zZWNyZXRfc2hhcmVzIHx8IDE7XG5cdFx0dGhpcy5yb290UGF0aCA9IGNvbmZpZy5yb290UGF0aCB8fCAnc2VjcmV0Jztcblx0fVxuXG5cdGdldFRyYXZlcnNhYmxlTGVhZnMgKG9iamVjdCkge1xuXHRcdGxldCBsZWFmcyA9IFtdO1xuXG5cdFx0dHJhdmVyc2Uob2JqZWN0KS5mb3JFYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0aGlzLmlzTGVhZikge1xuXHRcdFx0XHRsZWFmcy5wdXNoKHtrZXk6IHRyYXZlcnNlKG9iamVjdCkuZ2V0KHRoaXMucGF0aCksIHBhdGg6IHRoaXMucGF0aH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGxlYWZzO1xuXHR9XG5cblx0YXN5bmMgZ2V0VmFsdWUgKGNvbmZpZykge1xuXHRcdGZvciAobGV0IGtleSA9IDA7IGtleSA8IHRoaXMua2V5cy5sZW5ndGg7IGtleSsrKSB7XG5cdFx0XHRhd2FpdCB0aGlzLnZhdWx0LnVuc2VhbCh7c2VjcmV0X3NoYXJlczogdGhpcy5zZWNyZXRTaGFyZXMsIGtleTogdGhpcy5rZXlzW2tleV19KTtcblx0XHR9XG5cblx0XHRsZXQgbGVhZnMgPSB0aGlzLmdldFRyYXZlcnNhYmxlTGVhZnMoY29uZmlnKSxcblx0XHRcdGxlYWZzVG9SZXNvbHZlID0gW107XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlYWZzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgbGVhZiA9IGxlYWZzW2ldO1xuXHRcdFx0bGVhZnNUb1Jlc29sdmUucHVzaCh0aGlzLnJlc29sdmVMZWFmKHtjb25maWcsIGxlYWZ9KSk7XG5cdFx0fVxuXG5cdFx0ZGVidWcoY2BmZXRjaGluZyAke2xlYWZzVG9SZXNvbHZlLmxlbmd0aH0uYm9sZCBzZWNyZXRzIGZyb20gdmF1bHRgLmdyZWVuKTtcblxuXHRcdGF3YWl0IFByb21pc2UuYWxsKGxlYWZzVG9SZXNvbHZlKTtcblxuXHRcdHJldHVybiBjb25maWc7XG5cdH1cblxuXHRAcnRyeSh7cmV0cmllczogMTAsIHZlcmJvc2U6IHRydWV9KVxuXHRhc3luYyByZXNvbHZlTGVhZiAoe2NvbmZpZywgbGVhZn0pIHtcblx0XHRsZXQgeyBrZXksIHBhdGggfSA9IGxlYWY7XG5cblx0XHR0cnkge1xuXHRcdFx0bGV0IGRhdGEgPSAoYXdhaXQgdGhpcy52YXVsdC5yZWFkKGAke3RoaXMucm9vdFBhdGh9LyR7a2V5fWApKS5kYXRhO1xuXHRcdFx0dHJhdmVyc2UoY29uZmlnKS5zZXQocGF0aCwgZGF0YS52YWx1ZSB8fCBkYXRhKTtcblx0XHRcdGRlYnVnKGNgJHsnbG9hZGVkJ30uZGltICR7a2V5fS5ib2xkYCk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGVycm9yLnN0YWNrID0gY2Akeyd2YXVsdC1nZXQ6J30uYm9sZCBmYWlsZWQgcmV0cml2aW5nIGtleSAke2BcIiR7a2V5fVwiYH0uYm9sZCwgYXJlIHlvdSBzdXJlIGl0IGV4aXN0cz9cXG4ke2Vycm9yLnN0YWNrfWAucmVkLnRvU3RyaW5nKCk7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKG9wdGlvbnMpID0+IHtcblx0bGV0IHZhdWx0ID0gbmV3IFZhdWx0R2V0KG9wdGlvbnMpO1xuXHRyZXR1cm4ge1xuXHRcdGdldDogdmF1bHQuZ2V0VmFsdWUuYmluZCh2YXVsdClcblx0fTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1vd24tcHJvcGVydHktZGVzY3JpcHRvclwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3JcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL3RhZ2dlZFRlbXBsYXRlTGl0ZXJhbFwiXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2FzeW5jVG9HZW5lcmF0b3JcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCJcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3NcIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5vZGUtdmF1bHRcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcIm5vZGUtdmF1bHRcIlxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRyYXZlcnNlXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJ0cmF2ZXJzZVwiXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZGVidWdcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImRlYnVnXCJcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGVtcGxhdGUtY29sb3JzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJ0ZW1wbGF0ZS1jb2xvcnNcIlxuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJydHJ5XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJydHJ5XCJcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==