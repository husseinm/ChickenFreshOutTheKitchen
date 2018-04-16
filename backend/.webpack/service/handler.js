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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.auth = exports.handleWebhooks = exports.getAdminPanel = undefined;\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"babel-runtime/core-js/json/stringify\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _values = __webpack_require__(/*! babel-runtime/core-js/object/values */ \"babel-runtime/core-js/object/values\");\n\nvar _values2 = _interopRequireDefault(_values);\n\nvar _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ \"babel-runtime/core-js/promise\");\n\nvar _promise2 = _interopRequireDefault(_promise);\n\nvar _regenerator = __webpack_require__(/*! babel-runtime/regenerator */ \"babel-runtime/regenerator\");\n\nvar _regenerator2 = _interopRequireDefault(_regenerator);\n\nvar _asyncToGenerator2 = __webpack_require__(/*! babel-runtime/helpers/asyncToGenerator */ \"babel-runtime/helpers/asyncToGenerator\");\n\nvar _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);\n\nvar _ramda = __webpack_require__(/*! ramda */ \"ramda\");\n\nvar _ramda2 = _interopRequireDefault(_ramda);\n\nvar _iot = __webpack_require__(/*! ./iot */ \"./iot.js\");\n\nvar _awsSdk = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\nvar _moment = __webpack_require__(/*! moment */ \"moment\");\n\nvar _moment2 = _interopRequireDefault(_moment);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar dynamo = new _awsSdk.DynamoDB({ region: 'us-east-1' });\n\n// curl -X PUT -H \"Authorization: Bearer SECRET\" -H \"Content-Type: application/json\" -d \"[\\\"PAYMENT_UPDATED\\\"]\" https://connect.squareup.com/v1/LOCATION/webhooks\n// TODO: List payments failover\n// TODO: Add HMAC signing for security\n\n// TODO:\n//\n// Why is shadow not updating with current data or constantly being ocrrected?\n// Remove from shadow on click.\n//\n// Average Order Time\n// Order time over last 3 hours\n// last weeks order count by day in array\n\n\nvar isValidRequest = function isValidRequest(event) {\n  return true;\n};\n\nvar fetchSquare = function () {\n  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(endpoint) {\n    return _regenerator2.default.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            return _context.abrupt('return', fetch('https://connect.squareup.com/v1/' + process.env.LOCATION_ID + endpoint, {\n              headers: {\n                Authorization: 'Bearer ' + process.env.SQUARE_SECRET\n              }\n            }).then(function (r) {\n              return r.json();\n            }));\n\n          case 1:\n          case 'end':\n            return _context.stop();\n        }\n      }\n    }, _callee, undefined);\n  }));\n\n  return function fetchSquare(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar getPaymentById = function () {\n  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(paymentId) {\n    return _regenerator2.default.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            return _context2.abrupt('return', fetchSquare('/payments/' + paymentId));\n\n          case 1:\n          case 'end':\n            return _context2.stop();\n        }\n      }\n    }, _callee2, undefined);\n  }));\n\n  return function getPaymentById(_x2) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\nvar wasOrderRefunded = function wasOrderRefunded(o) {\n  return o.refunded_money.amount < 0;\n};\nvar generatePayloadFromSquareOrder = function generatePayloadFromSquareOrder(order) {\n  var processItems = _ramda2.default.pipe(_ramda2.default.filter(function (i) {\n    return i.itemization_type === \"ITEM\";\n  }), _ramda2.default.map(_ramda2.default.pipe(_ramda2.default.pick(['name', 'item_variation_name', 'quantity', 'modifiers', 'notes']), _ramda2.default.evolve({\n    quantity: parseInt,\n    modifiers: _ramda2.default.pluck('name')\n  }))));\n\n  return {\n    id: order.id,\n    type: 'ORDER',\n    created_at: order.created_at,\n    items: processItems(order.itemizations)\n  };\n};\n\nvar getAllFinishedOrders = function getAllFinishedOrders() {\n  return new _promise2.default(function (resolve, reject) {\n    dynamo.scan({\n      TableName: 'chickenfreshoutthekitchen_finished_orders'\n    }, function (err, nextMeg) {\n      if (err) return reject(err);\n      resolve(nextMeg);\n    });\n  });\n};\n\nvar getAdminPanel = exports.getAdminPanel = function () {\n  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(event, context, callback) {\n    var completedOrdersObj, completedOrderCount, completedOrdersByDay, flattenOrderCompletionTimes, getAverageOfOrderCompletionTimes, flatCompletedOrders, allOrdersRecent;\n    return _regenerator2.default.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            _context3.prev = 0;\n            _context3.next = 3;\n            return getAllFinishedOrders();\n\n          case 3:\n            completedOrdersObj = _context3.sent;\n            completedOrderCount = completedOrdersObj.Count;\n            completedOrdersByDay = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []\n\n              // Calculate order times & bucket the orders\n            };\n            completedOrdersObj.Items.map(function (completedOrder) {\n              var times = completedOrder.payload.M.time.M;\n              var createdAt = (0, _moment2.default)(times.createdAt.S);\n              var finishedAt = (0, _moment2.default)(parseInt(times.finishedAt.N));\n\n              completedOrdersByDay[createdAt.day()].push({\n                createdAt: createdAt,\n                finishedAt: finishedAt,\n                timeToComplete: finishedAt.diff(createdAt, 'seconds')\n              });\n            });\n\n            flattenOrderCompletionTimes = _ramda2.default.map(_ramda2.default.prop('timeToComplete'));\n\n            getAverageOfOrderCompletionTimes = function getAverageOfOrderCompletionTimes(a) {\n              return _ramda2.default.compose(_ramda2.default.mean, flattenOrderCompletionTimes)(a) || 0;\n            };\n\n            flatCompletedOrders = _ramda2.default.reduce(_ramda2.default.concat, [])((0, _values2.default)(completedOrdersByDay));\n\n            // Recent is 12 hours\n\n            allOrdersRecent = _ramda2.default.filter(function (o) {\n              return o.createdAt.isBefore((0, _moment2.default)().add(12, 'hours'));\n            })(flatCompletedOrders);\n\n            // Calculate \n\n            return _context3.abrupt('return', callback(null, {\n              status: true,\n              avgOrderTime: getAverageOfOrderCompletionTimes(flatCompletedOrders),\n              avgOrderTimeRecent: getAverageOfOrderCompletionTimes(allOrdersRecent),\n              dayByDayOrderCompletionTimes: _ramda2.default.map(getAverageOfOrderCompletionTimes)(completedOrdersByDay),\n              dayByDayOrderCount: _ramda2.default.map(_ramda2.default.compose(_ramda2.default.length, flattenOrderCompletionTimes))(completedOrdersByDay)\n            }));\n\n          case 14:\n            _context3.prev = 14;\n            _context3.t0 = _context3['catch'](0);\n\n            console.log(\"Fail: \", _context3.t0);\n            return _context3.abrupt('return', callback(_context3.t0, { status: false }));\n\n          case 18:\n          case 'end':\n            return _context3.stop();\n        }\n      }\n    }, _callee3, undefined, [[0, 14]]);\n  }));\n\n  return function getAdminPanel(_x3, _x4, _x5) {\n    return _ref3.apply(this, arguments);\n  };\n}();\n\nvar handleWebhooks = exports.handleWebhooks = function () {\n  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(event, context, callback) {\n    var _JSON$parse, id, locationId, eventType, squareOrder;\n\n    return _regenerator2.default.wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            _JSON$parse = JSON.parse(event.body), id = _JSON$parse.entity_id, locationId = _JSON$parse.location_id, eventType = _JSON$parse.event_type;\n\n            // If not from Square OR not for the Tabuleh Cafe, drop it.\n\n            if (!(locationId !== process.env.LOCATION_ID || !isValidRequest())) {\n              _context4.next = 3;\n              break;\n            }\n\n            return _context4.abrupt('return', callback(null, { status: false, message: 'Invalid Request' }));\n\n          case 3:\n            if (!(eventType === 'PAYMENT_UPDATED')) {\n              _context4.next = 10;\n              break;\n            }\n\n            _context4.next = 6;\n            return getPaymentById(id);\n\n          case 6:\n            squareOrder = _context4.sent;\n\n\n            if (wasOrderRefunded(squareOrder)) {\n              (0, _iot.removeFromDeviceShadow)(squareOrder.id);\n            } else {\n              (0, _iot.addToDeviceShadow)(generatePayloadFromSquareOrder(squareOrder));\n            }\n            _context4.next = 11;\n            break;\n\n          case 10:\n            return _context4.abrupt('return', callback(null, { status: false, message: 'Unhandled Event Type' }));\n\n          case 11:\n          case 'end':\n            return _context4.stop();\n        }\n      }\n    }, _callee4, undefined);\n  }));\n\n  return function handleWebhooks(_x6, _x7, _x8) {\n    return _ref4.apply(this, arguments);\n  };\n}();\n\nvar auth = exports.auth = function auth(event, context, callback) {\n  try {\n    (0, _iot.getIoTDeviceToken)().then(function (b) {\n      return callback(null, {\n        statusCode: 200,\n        headers: {\n          'Access-Control-Allow-Origin': '*'\n        },\n        body: (0, _stringify2.default)(b)\n      });\n    });\n  } catch (e) {\n    callback(e);\n  }\n};\n\n//# sourceURL=webpack:///./handler.js?");

/***/ }),

/***/ "./iot.js":
/*!****************!*\
  !*** ./iot.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.getIoTDeviceToken = exports.removeFromDeviceShadow = exports.addToDeviceShadow = undefined;\n\nvar _maxSafeInteger = __webpack_require__(/*! babel-runtime/core-js/number/max-safe-integer */ \"babel-runtime/core-js/number/max-safe-integer\");\n\nvar _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);\n\nvar _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ \"babel-runtime/core-js/json/stringify\");\n\nvar _stringify2 = _interopRequireDefault(_stringify);\n\nvar _promise = __webpack_require__(/*! babel-runtime/core-js/promise */ \"babel-runtime/core-js/promise\");\n\nvar _promise2 = _interopRequireDefault(_promise);\n\nvar _awsSdk = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\nvar _awsSdk2 = _interopRequireDefault(_awsSdk);\n\nvar _awsIotDeviceSdk = __webpack_require__(/*! aws-iot-device-sdk */ \"aws-iot-device-sdk\");\n\nvar _awsIotDeviceSdk2 = _interopRequireDefault(_awsIotDeviceSdk);\n\nvar _textEncoding = __webpack_require__(/*! text-encoding */ \"text-encoding\");\n\nvar _textEncoding2 = _interopRequireDefault(_textEncoding);\n\nvar _ramda = __webpack_require__(/*! ramda */ \"ramda\");\n\nvar _ramda2 = _interopRequireDefault(_ramda);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar region = 'us-east-1';\nvar iot = new _awsSdk2.default.Iot({ region: 'us-east-1' });\nvar roleName = 'employee-chickenfreshoutthekitchen';\nvar iotTopic = '/tabulehcafe';\nvar thingName = 'tabulehcafe';\n\nvar sts = void 0,\n    iotData = void 0,\n    iotEndpoint = void 0,\n    partial = void 0,\n    iotIndex = false;\n\nvar initializeIoT = function initializeIoT() {\n    return new _promise2.default(function (resolve, reject) {\n        if (iotData) return resolve();\n\n        iot.describeEndpoint({}, function (err, data) {\n            if (err) return reject(err);\n\n            iotEndpoint = data.endpointAddress;\n            iotData = new _awsSdk2.default.IotData({ region: region, endpoint: iotEndpoint });\n            sts = new _awsSdk2.default.STS({ region: region });\n\n            resolve();\n        });\n    });\n};\n\nvar getShadow = function getShadow() {\n    return initializeIoT().then(function () {\n        return new _promise2.default(function (resolve, reject) {\n            iotData.getThingShadow({ thingName: thingName }, function (err, data) {\n                if (err) return resolve({});\n                resolve(_ramda2.default.clone(JSON.parse(data.payload).state.desired));\n            });\n        });\n    });\n};\n\nvar updateShadow = function updateShadow(desired) {\n    return initializeIoT().then(function () {\n        return new _promise2.default(function (resolve, reject) {\n            iotData.updateThingShadow({ thingName: thingName, payload: (0, _stringify2.default)({ state: { desired: desired } }) }, function (err, data) {\n                if (err) return reject(err);\n                resolve();\n            });\n        });\n    });\n};\n\nvar addToDeviceShadow = exports.addToDeviceShadow = function addToDeviceShadow(obj) {\n    return getShadow().then(function (currentState) {\n        return updateShadow(_ramda2.default.assoc(obj.id, obj, currentState));\n    });\n};\n\nvar removeFromDeviceShadow = exports.removeFromDeviceShadow = function removeFromDeviceShadow(id) {\n    return getShadow().then(function (currentState) {\n        return updateShadow(_ramda2.default.dissoc(id, currentState));\n    });\n};\n\nvar getIoTDeviceToken = exports.getIoTDeviceToken = function getIoTDeviceToken() {\n    return initializeIoT().then(function () {\n        return new _promise2.default(function (resolve, reject) {\n            // Get the account id which will be used to assume a role\n            sts.getCallerIdentity({}, function (err, data) {\n                if (err) return reject(err);\n\n                var params = {\n                    RoleArn: 'arn:aws:iam::' + data.Account + ':role/' + roleName,\n                    RoleSessionName: Math.floor(Math.random() * _maxSafeInteger2.default).toString()\n                };\n\n                // Assume role returns temporary keys\n                sts.assumeRole(params, function (err, data) {\n                    if (err) return reject(err);\n\n                    resolve({\n                        iotEndpoint: iotEndpoint,\n                        region: region,\n                        accessKey: data.Credentials.AccessKeyId,\n                        secretKey: data.Credentials.SecretAccessKey,\n                        sessionToken: data.Credentials.SessionToken\n                    });\n                });\n            });\n        });\n    });\n};\n\n//# sourceURL=webpack:///./iot.js?");

/***/ }),

/***/ "aws-iot-device-sdk":
/*!*************************************!*\
  !*** external "aws-iot-device-sdk" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-iot-device-sdk\");\n\n//# sourceURL=webpack:///external_%22aws-iot-device-sdk%22?");

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

/***/ "babel-runtime/core-js/object/values":
/*!******************************************************!*\
  !*** external "babel-runtime/core-js/object/values" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/core-js/object/values\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/core-js/object/values%22?");

/***/ }),

/***/ "babel-runtime/core-js/promise":
/*!************************************************!*\
  !*** external "babel-runtime/core-js/promise" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-runtime/core-js/promise\");\n\n//# sourceURL=webpack:///external_%22babel-runtime/core-js/promise%22?");

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

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

/***/ }),

/***/ "ramda":
/*!************************!*\
  !*** external "ramda" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ramda\");\n\n//# sourceURL=webpack:///external_%22ramda%22?");

/***/ }),

/***/ "text-encoding":
/*!********************************!*\
  !*** external "text-encoding" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"text-encoding\");\n\n//# sourceURL=webpack:///external_%22text-encoding%22?");

/***/ })

/******/ })));