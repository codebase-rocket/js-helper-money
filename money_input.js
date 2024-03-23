// Info: Contains Functions Related to Money Input Data Cleanup and Validations
'use strict';

// Shared Dependencies (Managed by Main Entry Module & Loader)
var Lib;

// Exclusive Dependencies
var CONFIG; // (Managed by Main Entry Module & Loader)
const CURRENCY_CODES = require('./currency-codes.json');

/////////////////////////// Module-Loader START ////////////////////////////////

  /********************************************************************
  Load dependencies and configurations

  @param {Set} shared_libs - Reference to libraries already loaded in memory by other modules
  @param {Set} config - Custom configuration in key-value pairs

  @return nothing
  *********************************************************************/
  const loader = function(shared_libs, config){

    // Shared Dependencies (Managed my Main Entry Module)
    Lib = shared_libs;

    // Configuration (Managed my Main Entry Module)
    CONFIG = config;

  };

//////////////////////////// Module-Loader END /////////////////////////////////



///////////////////////////// Module Exports START /////////////////////////////
module.exports = function(shared_libs, config){

  // Run Loader
  loader(shared_libs, config);

  // Return Public Funtions of this module
  return MoneyInput;

};//////////////////////////// Module Exports END //////////////////////////////



///////////////////////////Public Functions START///////////////////////////////
const MoneyInput = { // Public functions accessible by other modules

  /********************************************************************
  Validate Currency Code

  @param {String} currency_code - Currency Code

  @return {Boolean} - true on success
  @return {Boolean} - false if validation fails
  *********************************************************************/
  validateCurrencyCode: function(currency_code){

    // Return
    return (currency_code in CURRENCY_CODES);

  },


  /********************************************************************
  Check if Native Symbol

  @param {String} symbol - Major Symbol

  @return {Boolean} - true in case Native Symbol
  @return {Boolean} - false if not Native Symbol
  *********************************************************************/
  isNativeSymbol: function( symbol ){

    // Initialise
    var native_symbols = [];

    // Itearte Each Countries
    Object.values(CURRENCY_CODES).forEach(function(config_data){

      // Add Native Symbol (Only if native symbol is present)
      if( !Lib.Utils.isNullOrUndefined(config_data['sym']['nv']) ){
        native_symbols.push(config_data['sym']['nv']);
      }

    });


    // Return
    return native_symbols.includes(symbol);

  },

};///////////////////////////Public Functions END///////////////////////////////



//////////////////////////Private Functions START///////////////////////////////
const _MoneyInput = {  // Private methods accessible within this modules only
  // None
};/////////////////////////Private Functions END////////////////////////////////
