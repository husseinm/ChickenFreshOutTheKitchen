(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./handler.js":
/*!********************!*\
  !*** ./handler.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.auth = exports.handleWebhooks = undefined;\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"babel-runtime/core-js/json/stringify\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _maxSafeInteger = __webpack_require__(/*! babel-runtime/core-js/number/max-safe-integer */ \"babel-runtime/core-js/number/max-safe-integer\");\n\nvar _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);\n\nvar _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ \"babel-runtime/regenerator\");\n\nvar _regenerator2 = _interopRequireDefault(_regenerator);\n\nvar _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ \"babel-runtime/helpers/asyncToGenerator\");\n\nvar _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);\n\nvar _awsSdk = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\nvar _awsSdk2 = _interopRequireDefault(_awsSdk);\n\nvar _ramda = __webpack_require__(/*! ramda */ \"ramda\");\n\nvar _ramda2 = _interopRequireDefault(_ramda);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar iot = new _awsSdk2.default.Iot({ region: 'us-east-1' });\nvar sts = new _awsSdk2.default.STS({ region: 'us-east-1' });\n\nvar roleName = 'employee-chickenfreshoutthekitchen';\n\n// curl -X PUT -H \"Authorization: Bearer SECRET\" -H \"Content-Type: application/json\" -d \"[\\\"PAYMENT_UPDATED\\\"]\" https://connect.squareup.com/v1/LOCATION/webhooks\n// TODO: List payments failover\n// TODO: Add HMAC signing for security\nvar isValidRequest = function isValidRequest(event) {\n  return true;\n};\n\nvar fetchSquare = function () {\n  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(endpoint) {\n    return _regenerator2.default.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            return _context.abrupt('return', fetch('https://connect.squareup.com/v1/' + process.env.LOCATION_ID + endpoint, {\n              headers: {\n                Authorization: 'Bearer ' + process.env.SQUARE_SECRET\n              }\n            }).then(function (r) {\n              return r.json();\n            }));\n\n          case 1:\n          case 'end':\n            return _context.stop();\n        }\n      }\n    }, _callee, undefined);\n  }));\n\n  return function fetchSquare(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar getPaymentById = function () {\n  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(paymentId) {\n    return _regenerator2.default.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            return _context2.abrupt('return', fetchSquare('/payments/' + paymentId));\n\n          case 1:\n          case 'end':\n            return _context2.stop();\n        }\n      }\n    }, _callee2, undefined);\n  }));\n\n  return function getPaymentById(_x2) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\nvar generateOrderFromSquareItems = function generateOrderFromSquareItems(items) {\n  console.log(items);\n  return items;\n};\n\nvar handleWebhooks = exports.handleWebhooks = function () {\n  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(event, context, callback) {\n    var _JSON$parse, entityId, locationId, eventType, squareOrder;\n\n    return _regenerator2.default.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            _JSON$parse = JSON.parse(event.body), entityId = _JSON$parse.entity_id, locationId = _JSON$parse.location_id, eventType = _JSON$parse.event_type;\n\n            // If not from Square OR not for the Tabuleh Cafe, drop it.\n\n            if (!(locationId !== process.env.LOCATION_ID || !isValidRequest())) {\n              _context3.next = 3;\n              break;\n            }\n\n            return _context3.abrupt('return', callback(null, { status: false, message: 'Invalid Request' }));\n\n          case 3:\n            if (!(eventType === 'PAYMENT_UPDATED')) {\n              _context3.next = 10;\n              break;\n            }\n\n            _context3.next = 6;\n            return getPaymentById(entityId);\n\n          case 6:\n            squareOrder = _context3.sent;\n\n            generateOrderFromSquareItems(squareOrder.itemizations);\n\n            _context3.next = 11;\n            break;\n\n          case 10:\n            return _context3.abrupt('return', callback(null, { status: false, message: 'Unhandled Event Type' }));\n\n          case 11:\n          case 'end':\n            return _context3.stop();\n        }\n      }\n    }, _callee3, undefined);\n  }));\n\n  return function handleWebhooks(_x3, _x4, _x5) {\n    return _ref3.apply(this, arguments);\n  };\n}();\n\nvar auth = exports.auth = function auth(event, context, callback) {\n  // Get the endpoint address\n  iot.describeEndpoint({}, function (err, data) {\n    if (err) return callback(err);\n\n    var iotEndpoint = data.endpointAddress;\n\n    var partial = iotEndpoint.replace('.amazonaws.com', '');\n    var iotIndex = iotEndpoint.indexOf('iot');\n    var region = partial.substring(iotIndex + 4);\n\n    // Get the account id which will be used to assume a role\n    sts.getCallerIdentity({}, function (err, data) {\n      if (err) return callback(err);\n\n      var params = {\n        RoleArn: 'arn:aws:iam::' + data.Account + ':role/' + roleName,\n        RoleSessionName: Math.floor(Math.random() * _maxSafeInteger2.default).toString()\n      };\n\n      // Assume role returns temporary keys\n      sts.assumeRole(params, function (err, data) {\n        if (err) return callback(err);\n\n        callback(null, {\n          statusCode: 200,\n          headers: {\n            'Access-Control-Allow-Origin': '*'\n          },\n          body: (0, _stringify2.default)({\n            iotEndpoint: iotEndpoint,\n            region: region,\n            accessKey: data.Credentials.AccessKeyId,\n            secretKey: data.Credentials.SecretAccessKey,\n            sessionToken: data.Credentials.SessionToken\n          })\n        });\n      });\n    });\n  });\n};\n\n//# sourceURL=webpack:///./handler.js?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");\n\n//# sourceURL=webpack:///external_%22aws-sdk%22?");

/***/ }),

/***/ "babel-runtime/core-js/json/stringify":
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/core-js/json/stringify\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/core-js/json/stringify%22?");

/***/ }),

/***/ "babel-runtime/core-js/number/max-safe-integer":
/*!****************************************************************!*\
  !*** external "babel-runtime/core-js/number/max-safe-integer" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/core-js/number/max-safe-integer\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/core-js/number/max-safe-integer%22?");

/***/ }),

/***/ "babel-runtime/helpers/asyncToGenerator":
/*!*********************************************************!*\
  !*** external "babel-runtime/helpers/asyncToGenerator" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/helpers/asyncToGenerator\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/helpers/asyncToGenerator%22?");

/***/ }),

/***/ "babel-runtime/regenerator":
/*!********************************************!*\
  !*** external "babel-runtime/regenerator" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/regenerator\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/regenerator%22?");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ramda\");\n\n//# sourceURL=webpack:///external_%22ramda%22?");

/***/ })

/******/ })));