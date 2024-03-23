// Info: Test Cases
'use strict';

// Shared Dependencies
var Lib = {};

// Set Configrations
const money_config = {
  'CURRENCY_CODE': 'usd'
};

// Dependencies
Lib.Utils = require('js-helper-utils');
Lib.Debug = require('js-helper-debug')(Lib);
const [Money, MoneyInput] = require('js-helper-money')(Lib, money_config);


////////////////////////////SIMILUTATIONS//////////////////////////////////////
//
///////////////////////////////////////////////////////////////////////////////


/////////////////////////////STAGE SETUP///////////////////////////////////////
//
///////////////////////////////////////////////////////////////////////////////


/////////////////////////////////TESTS/////////////////////////////////////////

// Initialize
var major_list = [
  {
    value: 10,
    count: 2
  },
  {
    value: 10,
    count: 2
  }
]
var minor_list = [
  {
    value: 50,
    count: 1
  },
  {
    value: 50,
    count: 2
  },
  {
    value: 20,
    count: 2
  },
  {
    value: 20,
    count: 2
  },
  {
    value: 20,
    count: 1
  }
]

var currency_code = 'usd';
var decimal_value = 4;


// Test .validateCurrencyCode() function
// Lib.Debug.log(
//   'validateCurrencyCode(inr)',
//   MoneyInput.validateCurrencyCode('inr')
// );
// // Test .isNativeSymbol() function
// Lib.Debug.log(
//   'isNativeSymbol($)',
//   MoneyInput.isNativeSymbol('﷼')
// );


// Test .getCurrencySymbol() function
Lib.Debug.log(
  'getCurrencySymbol(₹)',
  Money.getCurrencySymbol("mx", "mxn", "es-MX")
);
// Lib.Debug.log(
//   'getCurrencySymbol(INR)',
//   Money.getCurrencySymbol("in", "inr", "en_uk")
// );
// Lib.Debug.log(
//   'getCurrencySymbolMinor(¢)',
//   Money.getCurrencySymbolMinor("us", "usd", "en_us")
// );
// Lib.Debug.log(
//   'getCurrencySymbolMinor(USD)',
//   Money.getCurrencySymbolMinor("us", "usd", "en_uk")
// );
//
//
// // Test .getCurrencyTarf() function
// Lib.Debug.log(
//   'getCurrencyTarf',
//   Money.getCurrencyTarf(currency_code, decimal_value)
// );
//
//
// // Test .getCurrencySymbolMinor() function
// Lib.Debug.log(
//   'getCurrencySymbolMinor',
//   Money.getCurrencySymbolMinor(currency_code, decimal_value)
// );
//
//
// // Test .getDenomination() function
// Lib.Debug.log(
//   'getDenomination',
//   Money.getDenomination(currency_code, decimal_value)
// );
//
//
// // Test .roundAmount() function
// Lib.Debug.log(
//   'roundAmount(10.23567)', // Output: 10.24
//   Money.roundAmount(10.23567, currency_code, decimal_value)
// );
//
//
// // Test .formatAmount() function
// Lib.Debug.log(
//   'formatAmount(10.23567)', // Output: "10.24"
//   Money.formatAmount(10.23567, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'formatAmount(10.0)', // Output: "10.00"
//   Money.formatAmount(10.0, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'formatAmount(10.0, currency_code, decimal_value, true)', // Output: "10"
//   Money.formatAmount(10.0, currency_code, decimal_value, true)
// );
//
//
// // Test .getTransactionalAmount() function
// Lib.Debug.log(
//   'getTransactionalAmount(10.3486)', // Output: 10
//   Money.getTransactionalAmount(10.3486, currency_code, decimal_value, true)
// );
// Lib.Debug.log(
//   'getTransactionalAmount(10.0)', // Output: 10
//   Money.getTransactionalAmount(10.0, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'getTransactionalAmount(10.9901)', // Output: 11
//   Money.getTransactionalAmount(10.9910, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'getTransactionalAmount(24.4)', // Output: 24.40
//   Money.getTransactionalAmount(24.4, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'getTransactionalAmount(18.35)', // Output: 1835
//   Money.getTransactionalAmount(18.35, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'getTransactionalAmount(40.88)', // Output: 4088
//   Money.getTransactionalAmount(40.88, currency_code, decimal_value)
// );
//
//
// // Test .getTransactionalAmountInFractionalCurrency() function
// Lib.Debug.log(
//   'getTransactionalAmountInFractionalCurrency(10.57)', // Output: 1057
//   Money.getTransactionalAmountInFractionalCurrency(10.57, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'getTransactionalAmountInFractionalCurrency(20.66666667)', // Output: 2067
//   Money.getTransactionalAmountInFractionalCurrency(20.66666667, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'getTransactionalAmountInFractionalCurrency(35)', // Output: 3500
//   Money.getTransactionalAmountInFractionalCurrency(35, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'getTransactionalAmountInFractionalCurrency(24.4)', // Output: 2440
//   Money.getTransactionalAmountInFractionalCurrency(24.4, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'getTransactionalAmountInFractionalCurrency(18.35)', // Output: 1835
//   Money.getTransactionalAmountInFractionalCurrency(18.35, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'getTransactionalAmountInFractionalCurrency(40.88)', // Output: 4088
//   Money.getTransactionalAmountInFractionalCurrency(40.88, currency_code, decimal_value)
// );
//
//
// Lib.Debug.log(
//   'getFractionalAmountInLargeCurrency(4088)', // Output: 40.88
//   Money.getFractionalAmountInLargeCurrency(4088, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'getFractionalAmountInLargeCurrency(40888398219)', // Output: 408883982.10
//   Money.getFractionalAmountInLargeCurrency(40888398219, currency_code, decimal_value)
// );
// Lib.Debug.log(
//   'getFractionalAmountInLargeCurrency(2067)', // Output: 408883982.10
//   Money.getFractionalAmountInLargeCurrency(2067, currency_code, decimal_value)
// );
//
//
// // Test .sum() function
// Lib.Debug.log(
//   'sum([ 10.0001, 10.02 ])', // Output: 10
//   Money.sum([ 10.0001, 10.02 ], currency_code, decimal_value)
// );
//
//
// // Test .calculateTotalAmount() function
// Lib.Debug.log(
//   'calculateTotalAmount()', // Output: 10
//   Money.calculateTotalAmount(major_list, minor_list, currency_code, decimal_value)
// );

///////////////////////////////////////////////////////////////////////////////
