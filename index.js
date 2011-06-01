/*
 * What is a damn comma? It's the trailing comma in an array or object definition in Javascript or JSON that would
 * be legal in PHP, Python, or similar languages, but causes a parsing error or exception here. Damn commas.
 * 
 * e.g.: 
 * 
 * var dca = [ "a", "b", ];
 * var dco = { a: "a", b: "b", }
 * 
 */

var Module = require("module");

function removetheDamnCommas(code) {
  return code.replace(/(,)(\s*[\]\}])/g, "$2");
}

/*
 * Introducing an extra step in loading modules to remove the damn comma in Javascript files.
 * 
 * After calling this function with flag = true, newly loaded modules pass through the damncomma functionality.
 * Call it with flag = false, and future require will use the normal module loader functionality.
 */
exports.modules = function(flag) { 
  if( flag ) {
    Module.prototype._actuallyCompile = Module.prototype._compile;
    Module.prototype._compile = function(content, filename) {
      if( arguments.length ) {
        arguments[0] = removetheDamnCommas(arguments[0]);
      }
      Module.prototype._actuallyCompile.apply(this, arguments);
    };  
  } else {
    if( Module.prototype._actuallyCompile ) {
      Module.prototype._compile = Module.prototype._actuallyCompile;
    }    
  }
};

/*
 * Alter JSON parsing to accommodate damn commas. 
 * 
 * After calling this function with flag = true, JSON containing damn commas will be parsed.
 * After calling this function with flag = false, JSON parsing will go back to throwing exceptions 
 * on encountering damn commas.
 */
exports.JSON = function(flag) {
  if( flag ) {
    JSON.actuallyParse = JSON.parse;
    JSON.parse = function() {
      if( arguments.length ) {
        arguments[0] = removetheDamnCommas(arguments[0]);
      }
      return JSON.actuallyParse.apply(JSON, arguments);
    };    
  } else {
    if( JSON.actuallyParse ) {
      JSON.parse = JSON.actuallyParse;
    }
  }
};