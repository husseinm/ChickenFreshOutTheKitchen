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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/promise");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("text-encoding");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("aws-iot-device-sdk");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/number/max-safe-integer");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getIoTDeviceToken = exports.removeFromDeviceShadow = exports.addToDeviceShadow = undefined;

var _maxSafeInteger = __webpack_require__(8);

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

var _stringify = __webpack_require__(3);

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(2);

var _promise2 = _interopRequireDefault(_promise);

var _awsSdk = __webpack_require__(0);

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _awsIotDeviceSdk = __webpack_require__(7);

var _awsIotDeviceSdk2 = _interopRequireDefault(_awsIotDeviceSdk);

var _textEncoding = __webpack_require__(6);

var _textEncoding2 = _interopRequireDefault(_textEncoding);

var _ramda = __webpack_require__(1);

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var region = 'us-east-1';
var iot = new _awsSdk2.default.Iot({ region: 'us-east-1' });
var roleName = 'employee-chickenfreshoutthekitchen';
var iotTopic = '/tabulehcafe';
var thingName = 'tabulehcafe';

var sts = void 0,
    iotData = void 0,
    iotEndpoint = void 0,
    partial = void 0,
    iotIndex = false;

var initializeIoT = function initializeIoT() {
    return new _promise2.default(function (resolve, reject) {
        if (iotData) return resolve();

        iot.describeEndpoint({}, function (err, data) {
            if (err) return reject(err);

            iotEndpoint = data.endpointAddress;
            iotData = new _awsSdk2.default.IotData({ region: region, endpoint: iotEndpoint });
            sts = new _awsSdk2.default.STS({ region: region });

            resolve();
        });
    });
};

var getShadow = function getShadow() {
    return initializeIoT().then(function () {
        return new _promise2.default(function (resolve, reject) {
            iotData.getThingShadow({ thingName: thingName }, function (err, data) {
                if (err) return resolve({});
                resolve(_ramda2.default.clone(JSON.parse(data.payload).state.desired));
            });
        });
    });
};

var updateShadow = function updateShadow(desired) {
    return initializeIoT().then(function () {
        return new _promise2.default(function (resolve, reject) {
            iotData.updateThingShadow({ thingName: thingName, payload: (0, _stringify2.default)({ state: { desired: desired } }) }, function (err, data) {
                if (err) return reject(err);
                resolve();
            });
        });
    });
};

var addToDeviceShadow = exports.addToDeviceShadow = function addToDeviceShadow(obj) {
    return getShadow().then(function (currentState) {
        return updateShadow(_ramda2.default.assoc(obj.id, obj, currentState));
    });
};

var removeFromDeviceShadow = exports.removeFromDeviceShadow = function removeFromDeviceShadow(id) {
    return getShadow().then(function (currentState) {
        return updateShadow(_ramda2.default.assoc(id, null, currentState));
    });
};

var getIoTDeviceToken = exports.getIoTDeviceToken = function getIoTDeviceToken() {
    return initializeIoT().then(function () {
        return new _promise2.default(function (resolve, reject) {
            // Get the account id which will be used to assume a role
            sts.getCallerIdentity({}, function (err, data) {
                if (err) return reject(err);

                var params = {
                    RoleArn: 'arn:aws:iam::' + data.Account + ':role/' + roleName,
                    RoleSessionName: Math.floor(Math.random() * _maxSafeInteger2.default).toString()
                };

                // Assume role returns temporary keys
                sts.assumeRole(params, function (err, data) {
                    if (err) return reject(err);

                    resolve({
                        iotEndpoint: iotEndpoint,
                        region: region,
                        accessKey: data.Credentials.AccessKeyId,
                        secretKey: data.Credentials.SecretAccessKey,
                        sessionToken: data.Credentials.SessionToken
                    });
                });
            });
        });
    });
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/values");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.handleWebhooks = exports.finishOrder = exports.getAdminPanel = undefined;

var _regenerator = __webpack_require__(12);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _values = __webpack_require__(11);

var _values2 = _interopRequireDefault(_values);

var _asyncToGenerator2 = __webpack_require__(10);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _stringify = __webpack_require__(3);

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = __webpack_require__(2);

var _promise2 = _interopRequireDefault(_promise);

var _ramda = __webpack_require__(1);

var _ramda2 = _interopRequireDefault(_ramda);

var _iot = __webpack_require__(9);

var _awsSdk = __webpack_require__(0);

var _moment = __webpack_require__(5);

var _moment2 = _interopRequireDefault(_moment);

var _axios = __webpack_require__(4);

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamo = new _awsSdk.DynamoDB({ region: 'us-east-1' });

// curl -X PUT -H "Authorization: Bearer SECRET" -H "Content-Type: application/json" -d "[\"PAYMENT_UPDATED\"]" https://connect.squareup.com/v1/LOCATION/webhooks
// TODO: List payments failover
// TODO: Add HMAC signing for security

// TODO:
// 1. Online being troublesome
// 2. Fix closing of orders


var isValidRequest = function isValidRequest(event) {
  return true;
};

var fetchSquare = function fetchSquare(endpoint) {
  return (0, _axios2.default)('https://connect.squareup.com/v1/' + process.env.LOCATION_ID + endpoint, {
    headers: {
      Authorization: 'Bearer ' + process.env.SQUARE_SECRET
    }
  });
};

var getPaymentById = function getPaymentById(paymentId) {
  return fetchSquare('/payments/' + paymentId);
};

var wasOrderRefunded = function wasOrderRefunded(o) {
  return o.refunded_money.amount > 0;
};
var generatePayloadFromSquareOrder = function generatePayloadFromSquareOrder(order) {
  var processItems = _ramda2.default.pipe(_ramda2.default.filter(function (i) {
    return i.itemization_type === "ITEM";
  }), _ramda2.default.map(_ramda2.default.pipe(_ramda2.default.pick(['name', 'item_variation_name', 'quantity', 'modifiers', 'notes']), _ramda2.default.evolve({
    quantity: parseInt,
    modifiers: _ramda2.default.pluck('name')
  }))));

  return {
    id: order.id,
    type: 'ORDER',
    created_at: order.created_at,
    items: processItems(order.itemizations)
  };
};

var getAllFinishedOrders = function getAllFinishedOrders() {
  return new _promise2.default(function (resolve, reject) {
    dynamo.scan({
      TableName: 'chickenfreshoutthekitchen_finished_orders'
    }, function (err, nextMeg) {
      if (err) return reject(err);
      resolve(nextMeg);
    });
  });
};

var generateResponse = function generateResponse(b) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: (0, _stringify2.default)(b)
  };
};

// TODO: IAM & Proper CORS
var getAdminPanel = exports.getAdminPanel = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
    var completedOrdersObj, completedOrderCount, completedOrdersByDay, flattenOrderCompletionTimes, getAverageOfOrderCompletionTimes, flatCompletedOrders, allOrdersRecent;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return getAllFinishedOrders();

          case 3:
            completedOrdersObj = _context.sent;
            completedOrderCount = completedOrdersObj.Count;
            completedOrdersByDay = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []

              // Calculate order times & bucket the orders
            };
            completedOrdersObj.Items.map(function (completedOrder) {
              var times = completedOrder.payload.M.time.M;
              var createdAt = (0, _moment2.default)(times.createdAt.S);
              var finishedAt = (0, _moment2.default)(parseInt(times.finishedAt.N));

              completedOrdersByDay[createdAt.day()].push({
                createdAt: createdAt,
                finishedAt: finishedAt,
                timeToComplete: finishedAt.diff(createdAt, 'seconds')
              });
            });

            flattenOrderCompletionTimes = _ramda2.default.map(_ramda2.default.prop('timeToComplete'));

            getAverageOfOrderCompletionTimes = function getAverageOfOrderCompletionTimes(a) {
              return _ramda2.default.compose(_ramda2.default.mean, flattenOrderCompletionTimes)(a) || 0;
            };

            flatCompletedOrders = _ramda2.default.reduce(_ramda2.default.concat, [])((0, _values2.default)(completedOrdersByDay));

            // Recent is 12 hours

            allOrdersRecent = _ramda2.default.filter(function (o) {
              return o.createdAt.isAfter((0, _moment2.default)().subtract(12, 'hours'));
            })(flatCompletedOrders);

            // Calculate 

            return _context.abrupt('return', callback(null, generateResponse({
              status: true,
              avgOrderTime: getAverageOfOrderCompletionTimes(flatCompletedOrders),
              avgOrderTimeRecent: getAverageOfOrderCompletionTimes(allOrdersRecent),
              dayByDayOrderCompletionTimes: _ramda2.default.map(getAverageOfOrderCompletionTimes)(completedOrdersByDay),
              dayByDayOrderCount: _ramda2.default.map(_ramda2.default.compose(_ramda2.default.length, flattenOrderCompletionTimes))(completedOrdersByDay)
            })));

          case 14:
            _context.prev = 14;
            _context.t0 = _context['catch'](0);

            console.log("Fail: ", _context.t0);

            return _context.abrupt('return', callback(null, generateResponse({ status: false })));

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 14]]);
  }));

  return function getAdminPanel(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var finishOrder = exports.finishOrder = function finishOrder(event, context, callback) {
  (0, _iot.removeFromDeviceShadow)(event.orderId);
};

var handleWebhooks = exports.handleWebhooks = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(event, context, callback) {
    var _JSON$parse, id, locationId, eventType, squareOrder;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _JSON$parse = JSON.parse(event.body), id = _JSON$parse.entity_id, locationId = _JSON$parse.location_id, eventType = _JSON$parse.event_type;

            // If not from Square OR not for the Tabuleh Cafe, drop it.

            if (!(locationId === process.env.LOCATION_ID && isValidRequest())) {
              _context2.next = 12;
              break;
            }

            if (!(eventType === 'PAYMENT_UPDATED')) {
              _context2.next = 9;
              break;
            }

            _context2.next = 5;
            return getPaymentById(id);

          case 5:
            squareOrder = _context2.sent.data;


            if (wasOrderRefunded(squareOrder)) {
              (0, _iot.removeFromDeviceShadow)(squareOrder.id);
            } else {
              (0, _iot.addToDeviceShadow)(generatePayloadFromSquareOrder(squareOrder));
            }
            _context2.next = 10;
            break;

          case 9:
            console.log("Unsupported Event Type: ", eventType);

          case 10:
            _context2.next = 13;
            break;

          case 12:
            console.log("Invalid Message OR Location ID");

          case 13:
            return _context2.abrupt('return', callback(null, generateResponse({})));

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function handleWebhooks(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var auth = exports.auth = function auth(event, context, callback) {
  try {
    (0, _iot.getIoTDeviceToken)().then(function (b) {
      return callback(null, generateResponse(b));
    });
  } catch (e) {
    callback(e);
  }
};

/***/ })
/******/ ])));