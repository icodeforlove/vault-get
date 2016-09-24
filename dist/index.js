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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTFlOTZkZTdlOThmYTZmNGIyYmEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90YWdnZWRUZW1wbGF0ZUxpdGVyYWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVja1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm5vZGUtdmF1bHRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0cmF2ZXJzZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImRlYnVnXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidGVtcGxhdGUtY29sb3JzXCIiXSwibmFtZXMiOlsiZGVidWciLCJWYXVsdEdldCIsImNvbmZpZyIsInZhdWx0IiwiYXBpVmVyc2lvbiIsImVuZHBvaW50IiwidG9rZW4iLCJrZXlzIiwia2V5Iiwic2VjcmV0U2hhcmVzIiwic2VjcmV0X3NoYXJlcyIsInJvb3RQYXRoIiwib2JqZWN0IiwibGVhZnMiLCJmb3JFYWNoIiwiaXNMZWFmIiwicHVzaCIsImdldCIsInBhdGgiLCJsZW5ndGgiLCJ1bnNlYWwiLCJnZXRUcmF2ZXJzYWJsZUxlYWZzIiwibGVhZnNUb1Jlc29sdmUiLCJpIiwibGVhZiIsInJlc29sdmVMZWFmIiwiZ3JlZW4iLCJhbGwi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LHNCQUFNd0IsS0FBTixHQUFjLGdEQUFJLFlBQUosUUFBa0R4QixHQUFsRCxRQUEyRixhQUFNd0IsS0FBakcsRUFBeUdDLEdBQXpHLENBQTZHQyxRQUE3RyxFQUFkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBTVksVUFBQ0MsT0FBRCxFQUFhO0FBQzNCLFNBQU8sSUFBSWxDLFFBQUosQ0FBYWtDLE9BQWIsQ0FBUDtBQUNBLEU7Ozs7Ozs7O0FDcEVELHVEOzs7Ozs7QUNBQSwyRDs7Ozs7O0FDQUEseUU7Ozs7OztBQ0FBLG9FOzs7Ozs7QUNBQSxrRTs7Ozs7O0FDQUEsK0Q7Ozs7OztBQ0FBLHdDOzs7Ozs7QUNBQSxzQzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLDZDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5MWU5NmRlN2U5OGZhNmY0YjJiYVxuICoqLyIsImltcG9ydCBWYXVsdCBmcm9tICdub2RlLXZhdWx0JztcbmltcG9ydCB0cmF2ZXJzZSBmcm9tICd0cmF2ZXJzZSc7XG5pbXBvcnQgRGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGMgZnJvbSAndGVtcGxhdGUtY29sb3JzJztcblxuY29uc3QgZGVidWcgPSBEZWJ1ZygndmF1bHQnKTtcblxuY2xhc3MgVmF1bHRHZXQge1xuXHRjb25zdHJ1Y3RvciAoY29uZmlnKSB7XG5cdFx0dGhpcy52YXVsdCA9IFZhdWx0KHtcblx0XHRcdGFwaVZlcnNpb246ICd2MScsXG5cdFx0XHRlbmRwb2ludDogY29uZmlnLmVuZHBvaW50LFxuXHRcdFx0dG9rZW46IGNvbmZpZy50b2tlblxuXHRcdH0pO1xuXG5cdFx0dGhpcy5rZXlzID0gY29uZmlnLmtleXMgfHwgY29uZmlnLmtleSA/IGNvbmZpZy5rZXlzIHx8IFtjb25maWcua2V5XSA6IFtdO1xuXHRcdHRoaXMuc2VjcmV0U2hhcmVzID0gY29uZmlnLnNlY3JldF9zaGFyZXMgfHwgMTtcblx0XHR0aGlzLnJvb3RQYXRoID0gY29uZmlnLnJvb3RQYXRoIHx8ICdzZWNyZXQnO1xuXHR9XG5cblx0Z2V0VHJhdmVyc2FibGVMZWFmcyAob2JqZWN0KSB7XG5cdFx0bGV0IGxlYWZzID0gW107XG5cblx0XHR0cmF2ZXJzZShvYmplY3QpLmZvckVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHRoaXMuaXNMZWFmKSB7XG5cdFx0XHRcdGxlYWZzLnB1c2goe2tleTogdHJhdmVyc2Uob2JqZWN0KS5nZXQodGhpcy5wYXRoKSwgcGF0aDogdGhpcy5wYXRofSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gbGVhZnM7XG5cdH1cblxuXHRhc3luYyBnZXQgKGNvbmZpZykge1xuXHRcdGZvciAobGV0IGtleSA9IDA7IGtleSA8IHRoaXMua2V5cy5sZW5ndGg7IGtleSsrKSB7XG5cdFx0XHRhd2FpdCB0aGlzLnZhdWx0LnVuc2VhbCh7c2VjcmV0X3NoYXJlczogdGhpcy5zZWNyZXRTaGFyZXMsIGtleTogdGhpcy5rZXlzW2tleV19KTtcblx0XHR9XG5cblx0XHRsZXQgbGVhZnMgPSB0aGlzLmdldFRyYXZlcnNhYmxlTGVhZnMoY29uZmlnKSxcblx0XHRcdGxlYWZzVG9SZXNvbHZlID0gW107XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGxlYWZzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgbGVhZiA9IGxlYWZzW2ldO1xuXHRcdFx0bGVhZnNUb1Jlc29sdmUucHVzaCh0aGlzLnJlc29sdmVMZWFmKHtjb25maWcsIGxlYWZ9KSk7XG5cdFx0fVxuXG5cdFx0ZGVidWcoY2BmZXRjaGluZyAke2xlYWZzVG9SZXNvbHZlLmxlbmd0aH0uYm9sZCBzZWNyZXRzIGZyb20gdmF1bHRgLmdyZWVuKTtcblxuXHRcdGF3YWl0IFByb21pc2UuYWxsKGxlYWZzVG9SZXNvbHZlKTtcblxuXHRcdHJldHVybiBjb25maWc7XG5cdH1cblxuXHRhc3luYyByZXNvbHZlTGVhZiAoe2NvbmZpZywgbGVhZn0pIHtcblx0XHRsZXQgeyBrZXksIHBhdGggfSA9IGxlYWY7XG5cblx0XHR0cnkge1xuXHRcdFx0bGV0IGRhdGEgPSAoYXdhaXQgdGhpcy52YXVsdC5yZWFkKGAke3RoaXMucm9vdFBhdGh9LyR7a2V5fWApKS5kYXRhO1xuXHRcdFx0dHJhdmVyc2UoY29uZmlnKS5zZXQocGF0aCwgZGF0YS52YWx1ZSB8fCBkYXRhKTtcblx0XHRcdGRlYnVnKGNgJHsnbG9hZGVkJ30uZGltICR7a2V5fS5ib2xkYCk7XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGVycm9yLnN0YWNrID0gY2Akeyd2YXVsdC1nZXQ6J30uYm9sZCBmYWlsZWQgcmV0cml2aW5nIGtleSAke2BcIiR7a2V5fVwiYH0uYm9sZCwgYXJlIHlvdSBzdXJlIGl0IGV4aXN0cz9cXG4ke2Vycm9yLnN0YWNrfWAucmVkLnRvU3RyaW5nKCk7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKG9wdGlvbnMpID0+IHtcblx0cmV0dXJuIG5ldyBWYXVsdEdldChvcHRpb25zKTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL3JlZ2VuZXJhdG9yXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJiYWJlbC1ydW50aW1lL2NvcmUtanMvcHJvbWlzZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9jb3JlLWpzL3Byb21pc2VcIlxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90YWdnZWRUZW1wbGF0ZUxpdGVyYWxcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImJhYmVsLXJ1bnRpbWUvaGVscGVycy90YWdnZWRUZW1wbGF0ZUxpdGVyYWxcIlxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvYXN5bmNUb0dlbmVyYXRvclwiXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJiYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2tcIlxuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzc1wiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzXCJcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJub2RlLXZhdWx0XCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJub2RlLXZhdWx0XCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0cmF2ZXJzZVwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwidHJhdmVyc2VcIlxuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImRlYnVnXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJkZWJ1Z1wiXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGVtcGxhdGUtY29sb3JzXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJ0ZW1wbGF0ZS1jb2xvcnNcIlxuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9