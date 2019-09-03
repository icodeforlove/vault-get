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
	
	var _regenerator = __webpack_require__(1);
	
	var _regenerator2 = _interopRequireDefault(_regenerator);
	
	var _promise = __webpack_require__(2);
	
	var _promise2 = _interopRequireDefault(_promise);
	
	var _taggedTemplateLiteral2 = __webpack_require__(3);
	
	var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);
	
	var _asyncToGenerator2 = __webpack_require__(4);
	
	var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
	
	var _classCallCheck2 = __webpack_require__(5);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(6);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _templateObject = (0, _taggedTemplateLiteral3.default)(['fetching ', '.bold secrets from vault'], ['fetching ', '.bold secrets from vault']),
	    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['', '.dim ', '.bold'], ['', '.dim ', '.bold']),
	    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['', '.bold failed retriving key ', '.bold, are you sure it exists?\n', ''], ['', '.bold failed retriving key ', '.bold, are you sure it exists?\\n', '']);
	
	var _nodeVault = __webpack_require__(7);
	
	var _nodeVault2 = _interopRequireDefault(_nodeVault);
	
	var _traverse = __webpack_require__(8);
	
	var _traverse2 = _interopRequireDefault(_traverse);
	
	var _debug = __webpack_require__(9);
	
	var _debug2 = _interopRequireDefault(_debug);
	
	var _templateColors = __webpack_require__(10);
	
	var _templateColors2 = _interopRequireDefault(_templateColors);
	
	var _atmpt = __webpack_require__(11);
	
	var _atmpt2 = _interopRequireDefault(_atmpt);
	
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
			key: 'getValue',
			value: function () {
				var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(config) {
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
					return _ref.apply(this, arguments);
				}
	
				return getValue;
			}()
		}, {
			key: 'resolveLeaf',
			value: function () {
				var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(_ref3) {
					var _this = this;
	
					var config = _ref3.config,
					    leaf = _ref3.leaf;
					return _regenerator2.default.wrap(function _callee3$(_context3) {
						while (1) {
							switch (_context3.prev = _context3.next) {
								case 0:
									_context3.next = 2;
									return (0, _atmpt2.default)(function () {
										var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(attempt) {
											var key, path, data;
											return _regenerator2.default.wrap(function _callee2$(_context2) {
												while (1) {
													switch (_context2.prev = _context2.next) {
														case 0:
															key = leaf.key, path = leaf.path;
	
	
															if (attempt) {
																debug('retry #' + attempt + ': ' + _this.rootPath + '/' + key);
															}
	
															_context2.prev = 2;
															_context2.next = 5;
															return _this.vault.read(_this.rootPath + '/' + key);
	
														case 5:
															data = _context2.sent.data;
	
															(0, _traverse2.default)(config).set(path, data.value || data);
															debug((0, _templateColors2.default)(_templateObject2, 'loaded', key).toString());
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
											}, _callee2, _this, [[2, 10]]);
										}));
	
										return function (_x3) {
											return _ref4.apply(this, arguments);
										};
									}(), { maxAttempts: 10, delay: function delay(attempt) {
											return attempt * 1000;
										} });
	
								case 2:
									return _context3.abrupt('return', _context3.sent);
	
								case 3:
								case 'end':
									return _context3.stop();
							}
						}
					}, _callee3, this);
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
		var vault = new VaultGet(options);
		return {
			get: vault.getValue.bind(vault)
		};
	};
	
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/regenerator");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/taggedTemplateLiteral");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("node-vault");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("traverse");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("debug");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("template-colors");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("atmpt");

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWRiZTU1YzIyYjczYTE3MTNmMTQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90YWdnZWRUZW1wbGF0ZUxpdGVyYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtdmF1bHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0cmF2ZXJzZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidGVtcGxhdGUtY29sb3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXRtcHRcIiJdLCJuYW1lcyI6WyJkZWJ1ZyIsIlZhdWx0R2V0IiwiY29uZmlnIiwidmF1bHQiLCJhcGlWZXJzaW9uIiwiZW5kcG9pbnQiLCJ0b2tlbiIsImtleXMiLCJrZXkiLCJzZWNyZXRTaGFyZXMiLCJzZWNyZXRfc2hhcmVzIiwicm9vdFBhdGgiLCJvYmplY3QiLCJsZWFmcyIsImZvckVhY2giLCJpc0xlYWYiLCJwdXNoIiwiZ2V0IiwicGF0aCIsImxlbmd0aCIsInVuc2VhbCIsImdldFRyYXZlcnNhYmxlTGVhZnMiLCJsZWFmc1RvUmVzb2x2ZSIsImkiLCJsZWFmIiwicmVzb2x2ZUxlYWYiLCJncmVlbiIsInRvU3RyaW5nIiwiYWxsIiwiYXR0ZW1wdCIsInJlYWQiLCJkYXRhIiwic2V0IiwidmFsdWUiLCJzdGFjayIsInJlZCIsIm1heEF0dGVtcHRzIiwiZGVsYXkiLCJvcHRpb25zIiwiZ2V0VmFsdWUiLCJiaW5kIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLEtBQU1BLFFBQVEscUJBQU0sT0FBTixDQUFkOztLQUVNQyxRO0FBQ0wsb0JBQWFDLE1BQWIsRUFBcUI7QUFBQTs7QUFDcEIsUUFBS0MsS0FBTCxHQUFhLHlCQUFNO0FBQ2xCQyxnQkFBWSxJQURNO0FBRWxCQyxjQUFVSCxPQUFPRyxRQUZDO0FBR2xCQyxXQUFPSixPQUFPSTtBQUhJLElBQU4sQ0FBYjs7QUFNQSxRQUFLQyxJQUFMLEdBQVlMLE9BQU9LLElBQVAsSUFBZUwsT0FBT00sR0FBdEIsR0FBNEJOLE9BQU9LLElBQVAsSUFBZSxDQUFDTCxPQUFPTSxHQUFSLENBQTNDLEdBQTBELEVBQXRFO0FBQ0EsUUFBS0MsWUFBTCxHQUFvQlAsT0FBT1EsYUFBUCxJQUF3QixDQUE1QztBQUNBLFFBQUtDLFFBQUwsR0FBZ0JULE9BQU9TLFFBQVAsSUFBbUIsUUFBbkM7QUFDQTs7Ozt1Q0FFb0JDLE0sRUFBUTtBQUM1QixRQUFJQyxRQUFRLEVBQVo7O0FBRUEsNEJBQVNELE1BQVQsRUFBaUJFLE9BQWpCLENBQXlCLFlBQVk7QUFDcEMsU0FBSSxLQUFLQyxNQUFULEVBQWlCO0FBQ2hCRixZ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ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlZGJlNTVjMjJiNzNhMTcxM2YxNFxuICoqLyIsImltcG9ydCBWYXVsdCBmcm9tICdub2RlLXZhdWx0JztcbmltcG9ydCB0cmF2ZXJzZSBmcm9tICd0cmF2ZXJzZSc7XG5pbXBvcnQgRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGMgZnJvbSAndGVtcGxhdGUtY29sb3JzJztcbmltcG9ydCBhdG1wdCBmcm9tICdhdG1wdCc7XG5cbmNvbnN0IGRlYnVnID0gRGVidWcoJ3ZhdWx0Jyk7XG5cbmNsYXNzIFZhdWx0R2V0IHtcblx0Y29uc3RydWN0b3IgKGNvbmZpZykge1xuXHRcdHRoaXMudmF1bHQgPSBWYXVsdCh7XG5cdFx0XHRhcGlWZXJzaW9uOiAndjEnLFxuXHRcdFx0ZW5kcG9pbnQ6IGNvbmZpZy5lbmRwb2ludCxcblx0XHRcdHRva2VuOiBjb25maWcudG9rZW5cblx0XHR9KTtcblxuXHRcdHRoaXMua2V5cyA9IGNvbmZpZy5rZXlzIHx8IGNvbmZpZy5rZXkgPyBjb25maWcua2V5cyB8fCBbY29uZmlnLmtleV0gOiBbXTtcblx0XHR0aGlzLnNlY3JldFNoYXJlcyA9IGNvbmZpZy5zZWNyZXRfc2hhcmVzIHx8IDE7XG5cdFx0dGhpcy5yb290UGF0aCA9IGNvbmZpZy5yb290UGF0aCB8fCAnc2VjcmV0Jztcblx0fVxuXG5cdGdldFRyYXZlcnNhYmxlTGVhZnMgKG9iamVjdCkge1xuXHRcdGxldCBsZWFmcyA9IFtdO1xuXG5cdFx0dHJhdmVyc2Uob2JqZWN0KS5mb3JFYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdGlmICh0aGlzLmlzTGVhZikge1xuXHRcdFx0XHRsZWFmcy5wdXNoKHtrZXk6IHRyYXZlcnNlKG9iamVjdCkuZ2V0KHRoaXMucGF0aCksIHBhdGg6IHRoaXMucGF0aH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIGxlYWZzO1xuXHR9XG5cblx0YXN5bmMgZ2V0VmFsdWUgKGNvbmZpZykge1xuXHRcdGZvciAobGV0IGtleSA9IDA7IGtleSA8IHRoaXMua2V5cy5sZW5ndGg7IGtleSsrKSB7XG5cdFx0XHRhd2FpdCB0aGlzLnZhdWx0LnVuc2VhbCh7c2VjcmV0X3NoYXJlczogdGhpcy5zZWNyZXRTaGFyZXMsIGtleTogdGhpcy5rZXlzW2tleV19KTtcblx0XHR9XG5cblx0XHRsZXQgbGVhZnMgPSB0aGlzLmdldFRyYXZlcnNhYmxlTGVhZnMoY29uZmlnKSxcblx0XHRcdGxlYWZzVG9SZXNvbHZlID0gW107XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlYWZzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgbGVhZiA9IGxlYWZzW2ldO1xuXHRcdFx0bGVhZnNUb1Jlc29sdmUucHVzaCh0aGlzLnJlc29sdmVMZWFmKHtjb25maWcsIGxlYWZ9KSk7XG5cdFx0fVxuXG5cdFx0ZGVidWcoY2BmZXRjaGluZyAke2xlYWZzVG9SZXNvbHZlLmxlbmd0aH0uYm9sZCBzZWNyZXRzIGZyb20gdmF1bHRgLmdyZWVuLnRvU3RyaW5nKCkpO1xuXG5cdFx0YXdhaXQgUHJvbWlzZS5hbGwobGVhZnNUb1Jlc29sdmUpO1xuXG5cdFx0cmV0dXJuIGNvbmZpZztcblx0fVxuXG5cdGFzeW5jIHJlc29sdmVMZWFmICh7Y29uZmlnLCBsZWFmfSkge1xuXHRcdHJldHVybiBhd2FpdCBhdG1wdChhc3luYyBhdHRlbXB0ID0+IHtcblx0XHRcdGxldCB7IGtleSwgcGF0aCB9ID0gbGVhZjtcblxuXHRcdFx0aWYgKGF0dGVtcHQpIHtcblx0XHRcdFx0ZGVidWcoYHJldHJ5ICMke2F0dGVtcHR9OiAke3RoaXMucm9vdFBhdGh9LyR7a2V5fWApO1xuXHRcdFx0fVxuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHRsZXQgZGF0YSA9IChhd2FpdCB0aGlzLnZhdWx0LnJlYWQoYCR7dGhpcy5yb290UGF0aH0vJHtrZXl9YCkpLmRhdGE7XG5cdFx0XHRcdHRyYXZlcnNlKGNvbmZpZykuc2V0KHBhdGgsIGRhdGEudmFsdWUgfHwgZGF0YSk7XG5cdFx0XHRcdGRlYnVnKGNgJHsnbG9hZGVkJ30uZGltICR7a2V5fS5ib2xkYC50b1N0cmluZygpKTtcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdGVycm9yLnN0YWNrID0gY2Akeyd2YXVsdC1nZXQ6J30uYm9sZCBmYWlsZWQgcmV0cml2aW5nIGtleSAke2BcIiR7a2V5fVwiYH0uYm9sZCwgYXJlIHlvdSBzdXJlIGl0IGV4aXN0cz9cXG4ke2Vycm9yLnN0YWNrfWAucmVkLnRvU3RyaW5nKCk7XG5cdFx0XHRcdHRocm93IGVycm9yO1xuXHRcdFx0fVxuXHRcdH0sIHttYXhBdHRlbXB0czogMTAsIGRlbGF5OiBhdHRlbXB0ID0+IGF0dGVtcHQgKiAxMDAwfSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKG9wdGlvbnMpID0+IHtcblx0bGV0IHZhdWx0ID0gbmV3IFZhdWx0R2V0KG9wdGlvbnMpO1xuXHRyZXR1cm4ge1xuXHRcdGdldDogdmF1bHQuZ2V0VmFsdWUuYmluZCh2YXVsdClcblx0fTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90YWdnZWRUZW1wbGF0ZUxpdGVyYWxcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90YWdnZWRUZW1wbGF0ZUxpdGVyYWxcIlxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIlxuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCJcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLXZhdWx0XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJub2RlLXZhdWx0XCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0cmF2ZXJzZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwidHJhdmVyc2VcIlxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlYnVnXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJkZWJ1Z1wiXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGVtcGxhdGUtY29sb3JzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJ0ZW1wbGF0ZS1jb2xvcnNcIlxuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhdG1wdFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYXRtcHRcIlxuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9