// Info: Exporter for this module
'use strict';


/////////////////////////// Module-Loader START ////////////////////////////////

  /********************************************************************
  Constructor/Loader

  @param {Set} shared_libs - Reference to libraries already loaded in memory by other modules
  @param {Set} config_module - Custom configuration-data in key-value pairs

  @return {Set[]} - Sub-Modules in specific Sequence
  *********************************************************************/
  module.exports = function(shared_libs, config_module){

    // Fetch Module
    const Money = require(`./money`)(shared_libs, config_module);
    const MoneyInput = require(`./money_input`)(shared_libs, config_module);


    // Return Public Funtions of this module
    return [
      Money,
      MoneyInput
    ];
  }

//////////////////////////// Module-Loader END /////////////////////////////////
