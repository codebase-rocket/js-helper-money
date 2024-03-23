// Info: Boilerplate library. Contains Functions related to currency and money operations
'use strict';

// Shared Dependencies (Managed by Loader)
var Lib = {};

// Exclusive Dependencies
var CONFIG = require('./config'); // Loader can override it with Custom-Config
const CURRENCY_CODES = require('./currency-codes.json');
const LANGUAGES = require('./language.json');


/////////////////////////// Module-Loader START ////////////////////////////////

  /********************************************************************
  Load dependencies and configurations

  @param {Set} shared_libs - Reference to libraries already loaded in memory by other modules
  @param {Set} config - Custom configuration in key-value pairs

  @return nothing
  *********************************************************************/
  const loader = function(shared_libs, config){

    // Shared Dependencies (Must be loaded in memory already)
    Lib.Utils = shared_libs.Utils;
    Lib.Debug = shared_libs.Debug;

    // Override default configuration
    if( !Lib.Utils.isNullOrUndefined(config) ){
      Object.assign(CONFIG, config); // Merge custom configuration with defaults
    }

  };

//////////////////////////// Module-Loader END /////////////////////////////////



///////////////////////////// Module Exports START /////////////////////////////
module.exports = function(shared_libs, config){

  // Run Loader
  loader(shared_libs, config);

  // Return Public Funtions of this module
  return Money;

};//////////////////////////// Module Exports END //////////////////////////////



///////////////////////////Public Functions START///////////////////////////////
const Money = { // Public functions accessible by other modules

  /********************************************************************
  Get currency symbol

  @param {String} country_code - Country code. Example: 'in', 'us'
  @param {String} currency_code - Currency code. Example: 'inr', 'usd'
  @param {String} language_code - Language code. Example: 'hi_in', 'en_us'

  @return {String} currency_symbol - Currency symbol
  *********************************************************************/
  getCurrencySymbol: function(country_code, currency_code, language_code){

    // To Lowercase
    currency_code = currency_code.toLowerCase();
    country_code = country_code.toLowerCase();


    // Check if currency code is present in CURRENCY_CODES
    if( !(currency_code in CURRENCY_CODES) ){
      return null; // Currency code not found
    }


    // De-construct Language-Code
    let [ language, country ] = language_code.split('-');

    // To Lowercase
    country = country.toLowerCase();

    // Check if all parameters are present in their respective data
    if(
      country_code in LANGUAGES && // Check if country code is present in LANGUAGES
      language in LANGUAGES[country_code] && // Check if language code present in LANGUAGES[country_code]
      LANGUAGES[country_code][language].includes(currency_code) // Check if language code supports the given currency code
    ){
      // Return native symbol for the given currency code
      return CURRENCY_CODES[currency_code]['sym']['nv'];
    }

    // Return standard symbol for the given currency code if available
    return CURRENCY_CODES[currency_code]['sym']['st'];

  },


  /********************************************************************
  Get Minor currency symbol

  @param {String} country_code - Country code. Example: 'in', 'us'
  @param {String} currency_code - Currency code. Example: 'inr', 'usd'
  @param {String} language_code - Language code. Example: 'hi_in', 'en_us'

  @return {String} Currency Symbol Minor
  *********************************************************************/
  getCurrencySymbolMinor: function(country_code, currency_code, language_code){

    // To Lowercase
    currency_code = currency_code.toLowerCase();
    country_code = country_code.toLowerCase();


    // Check if currency code is present in CURRENCY_CODES
    if( !(currency_code in CURRENCY_CODES) ){
      return null; // Currency code not found
    }


    // De-construct Language-Code
    let [ language, country ] = language_code.split('-');

    // To Lowercase
    country = country.toLowerCase();

    // Check if all parameters are present in their respective data
    if(
      country_code in LANGUAGES && // Check if country code is present in LANGUAGES
      language in LANGUAGES[country_code] && // Check if language code present in LANGUAGES[country_code]
      LANGUAGES[country_code][language].includes(currency_code) // Check if language code supports the given currency code
    ){
      // Return native symbol for the given currency code
      return CURRENCY_CODES[currency_code]['symm']['nv'];
    }

    // Return standard symbol for the given currency code if available
    return CURRENCY_CODES[currency_code]['symm']['st'];

  },


  /********************************************************************
  Get currency transactional-fraction
  tarf: Total Amount Rounding Fraction

  @param {String} currency_code - Currency-Code

  @return {Number} tarf - Smallest transactional-fraction for this currency-code
  *********************************************************************/
  getCurrencyTarf: function(currency_code){

    // To Lowercase
    currency_code = currency_code.toLowerCase();


    // Return currency transactional-fraction
    return CURRENCY_CODES[currency_code]['tarf'];

  },


  /********************************************************************
  Get Denomination

  @param {String} currency_code - Currency-Code

  @return {Set} denomination - Denomination
  * @return {String[]} minor - List of partial denominations
  * @return {String[]} major - List of Full denomination
  *********************************************************************/
  getDenomination: function(currency_code){

    // To Lowercase
    currency_code = currency_code.toLowerCase();


    // Return currency major and minor
    return CURRENCY_CODES[currency_code]['denomination'];

  },


  /********************************************************************
  Round-off amount to correct decimal places

  @param {Number} amount - Amount in decimals
  @param {String} currency_code - Currency-Code
  @param {Number} [decimal_value] - (Optional) Decimal Value for RoundOff

  @return {Number} rounded_amount - Amount with proper round off
  *********************************************************************/
  roundAmount: function(amount, currency_code, decimal_value){

    // To Lowercase
    currency_code = currency_code.toLowerCase();


    // Round Amount to the Provided Decimal Value
    return Lib.Utils.round(
      amount,
      Lib.Utils.fallback(decimal_value, CURRENCY_CODES[currency_code]['dec']) // Override Decimal Value for Given Currency
    );

  },


  /********************************************************************
  Format amount to correct decimal places.
  (Use this function For print only) (10 -> 10 | 10.6 -> 10.60)

  @param {Number} amount - Amount in decimals
  @param {String} currency_code - Currency-Code
  @param {Number} [decimal_value] - (Optional) Decimal Value for RoundOff
  @param {Boolean} [no_pad] - (Optional) Do not add trailing zero after whole number values. True: 10->10 | False(default): 10->10.00

  @return {String} formatted_amount - Amount trimmed to currency-specific decimal places with proper round off.
  *********************************************************************/
  formatAmount: function(amount, currency_code, decimal_value, no_pad = false){

    // To Lowercase
    currency_code = currency_code.toLowerCase();


    // Round
    var amt = Money.roundAmount(amount, currency_code, decimal_value);

    // If Not a Whole number, add trailing zeros after decimal
    if( !no_pad || !Lib.Utils.isInteger(amt) ){
      return amt.toFixed( // toFixed() converts to string
        Lib.Utils.fallback(decimal_value, CURRENCY_CODES[currency_code]['dec']) // Override Decimal Value for Given Currency
      );
    }

    // Return number as string
    return amt.toString();

  },


  /********************************************************************
  Round-off amount to closest minimum transactional-fraction
  Ex: INR 15.20 -> 15
  Ex: INR 15.68 -> 16
  Ex: USD 20.66666667 -> 20.67
  Ex: $18.35 -> 18.35 (Special case of Maths in JS)
  Ex: $40.88 -> 40.88 (Special case of Maths in JS)

  @param {Number} amount - Amount in decimals
  @param {String} currency_code - Currency-Code
  @param {Number} [decimal_value] - (Optional) Decimal Value for RoundOff
  @param {Boolean} [apply_tarf] - (Optional) True in case tarf is applicable

  @return {Number} rounded_amount - Amount with proper round off
  *********************************************************************/
  getTransactionalAmount: function(amount, currency_code, decimal_value, apply_tarf){

    // To Lowercase
    currency_code = currency_code.toLowerCase();


    // Convert Decimal into Integer for arthhmetic (JS has otherwise errors in float maths)
    // Ref: https://stackoverflow.com/questions/588004/is-floating-point-math-broken
    var amt = _Money.convertToIntegerAmount(amount, currency_code, decimal_value);
    var transactional_factor = _Money.convertToIntegerAmount(
      Money.getCurrencyTarf(currency_code), // Round off factor (.01 means 1 cent)
      currency_code,
      decimal_value
    );


    // Return
    return _Money.convertFromIntegerAmount( // Convert back to float from integer
      apply_tarf ? (Math.round( amt / transactional_factor ) * transactional_factor) : amt, // Check If Tarf is applicable
      currency_code,
      decimal_value
    );

  },


  /********************************************************************
  Converts currency to Fractional-Currency
  Ex: $10.57 -> 1057 Cents
  Ex: $18.35 -> 1835 Cents (Special case of Maths in JS)
  Ex: $40.88 -> 4088 Cents (Special case of Maths in JS)
  Ex: $20.66666667 -> 2067 Cents
  Ex: $35 -> 3500 Cents
  Ex: $24.4 -> 2440 Cents

  @param {Number} amount - Amount in large currency ($10.57 or $20.66666667)
  @param {String} currency_code - Currency-Code
  @param {Number} [decimal_value] - (Optional) Decimal Value for RoundOff

  @return {Number} fractional_amount - Amount converted into Fractional currency (1057 or 2067)
  *********************************************************************/
  getTransactionalAmountInFractionalCurrency: function(amount, currency_code, decimal_value){

    // To Lowercase
    currency_code = currency_code.toLowerCase();


    // Round off currency
    amount = Money.getTransactionalAmount(amount, currency_code, decimal_value);


    // Return equivalant value in fractional-currency
    return _Money.convertToIntegerAmount(amount, currency_code, decimal_value);

  },


  /********************************************************************
  Converts Fractional-Currency to Large currency
  Ex: ¢1057 -> $ 10.57
  Ex: ¢1835 -> $ 18.35 (Special case of Maths in JS)
  Ex: ¢4088 -> $ 40.88 (Special case of Maths in JS)
  Ex: ¢2067 -> $ 20.66666667

  @param {Number} amount - Amount in fractional currency (¢4088 or ¢40888398210)
  @param {String} currency_code - Currency-Code
  @param {Number} [decimal_value] - (Optional) Decimal Value for RoundOff

  @return {Number} - amount in large currency
  *********************************************************************/
  getFractionalAmountInLargeCurrency: function(amount, currency_code, decimal_value){

    // To Lowercase
    currency_code = currency_code.toLowerCase();


    // Round off currency
    amount = Money.getTransactionalAmount(amount, currency_code, decimal_value);


    // Return equivalant value in large-currency
    return _Money.convertFromIntegerAmount(amount, currency_code, decimal_value)

  },


  /********************************************************************
  Calculate Total Amount

  @param {Set[]} majors_list - List of Major Denomination
  @param {Set[]} minors_list - List of Minor Denomination
  @param {String} currency_code - Currency Code
  @param {Number} [decimal_value] - (Optional) Decimal Value for RoundOff
  @param {Boolean} [apply_tarf] - (Optional) True in case tarf is applicable

  @return {Number} Calculated_total_amount
  *********************************************************************/
  calculateTotalAmount: function(major_list, minor_list, currency_code, decimal_value, apply_tarf){

    // To Lowercase
    currency_code = currency_code.toLowerCase();


    // Initialize
    var calculated_total_amount = 0;


    // Check if major list exist
    if( !Lib.Utils.isNullOrUndefined(major_list) ){

      // Iterate all majors
      major_list.forEach(function(major){
        // Calculate Major total
        calculated_total_amount = Money.sum([
          calculated_total_amount,
          (major['value'] * major['count'])
        ], currency_code, decimal_value);
      });

    }


    // Check if major list exist
    if( !Lib.Utils.isNullOrUndefined(minor_list) ){

      // Iterate all minors
      minor_list.forEach(function(minor){

        // Calculate minor total
        let minor_total = (minor['value'] * minor['count']);

        // Calculate Total amount
        calculated_total_amount = Money.sum([
          calculated_total_amount,
          (
            minor_total *
            Money.getCurrencyTarf(currency_code) // Round off factor (.01 means 1 cent)
          )
        ], currency_code, decimal_value);

      });

    }


    // Return
    return calculated_total_amount;

  },


  /********************************************************************
  Sum of numbers
  Properly add floting point numbers
  Ref: https://stackoverflow.com/questions/588004/is-floating-point-math-broken

  @param {Number[]} amounts - Array of Amounts in decimals
  @param {String} currency_code - Currency Code
  @param {Number} [decimal_value] - (Optional) Decimal Value for RoundOff

  @return {Number} rounded_amount - Amount with proper round off
  *********************************************************************/
  sum: function(amounts, currency_code, decimal_value){

    // To Lowercase
    currency_code = currency_code.toLowerCase();


    // Add all numbers after converting float to integer
    var total = amounts.reduce(function(sum, currValue){
      return sum + _Money.convertToIntegerAmount(currValue, currency_code, decimal_value);
    },0);


    // Return total after converting integer back to float
    return _Money.convertFromIntegerAmount(total, currency_code, decimal_value);

  },

};///////////////////////////Public Functions END///////////////////////////////



//////////////////////////Private Functions START///////////////////////////////
const _Money = { // Private functions accessible within this modules only

  /********************************************************************
  Converts Main + Fractional corrency into Fractional Currency
  15.20 -> 1520 | 15.1 -> 1510 (if 2 decimal)

  @param {Number} amount - Amount
  @param {String} currency_code - Currency Code
  @param {Number} [decimal_value] - (Optional) Decimal Value for RoundOff

  @return {Integer} new_amount - Amount in Fractional Currency
  *********************************************************************/
  convertToIntegerAmount: function(amount, currency_code, decimal_value){

    // To Lowercase
    currency_code = currency_code.toLowerCase();


    return Math.round(
      amount * Number(`1e${Lib.Utils.fallback(decimal_value, CURRENCY_CODES[currency_code]['dec'])}`), // Override Decimal Value for Given Currency
      0
    );

  },


  /********************************************************************
  Converts Fractional Currency to Main + Fractional corrency
  1520 -> 15.20 | 1510 -> 15.1  (if 2 decimal)

  @param {Integer} amount - Amount
  @param {String} currency_code - Currency Code
  @param {Number} [decimal_value] - (Optional) Decimal Value for RoundOff

  @return {Number} new_amount - Amount in  Main + Fractional corrency
  *********************************************************************/
  convertFromIntegerAmount: function(amount, currency_code, decimal_value){

    // To Lowercase
    currency_code = currency_code.toLowerCase();


    return Money.roundAmount(
      amount / Number(`1e${Lib.Utils.fallback(decimal_value, CURRENCY_CODES[currency_code]['dec'])}`), // Override Decimal Value for Given Currency
      currency_code,
      decimal_value
    );

  },

};//////////////////////////Private Functions END///////////////////////////////
