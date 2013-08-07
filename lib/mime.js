'use strict';


var mimes = require(require('path').join(__dirname, 'mime-types'));

/**
 * Quick mime types handler
 */
var Mime = {
  /**
   * Return mime type of the file
   * @param  {String} file
   * @param  {Mixed}  fallback return if no match with DB
   * @return {String}
   */
  lookup : function(file, fallback) {
    var ext = file.toLowerCase();

    do {
      ext = ext.slice(ext.indexOf('.') + 1);
      if (typeof mimes[ext] !== 'undefined') {
        return mimes[ext];
      }
    } while (ext.indexOf('.') !== -1);
    return (fallback !== undefined ? fallback : 'application/octet-stream');
  }
};


module.exports = Mime;