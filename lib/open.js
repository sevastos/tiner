'use strict';

var exec = require('child_process').exec;


var Open = {
  /**
   * Open a url on preferable the default Browser
   * @param  {String} url
   * @param  {Boolean} returnOnly
   */
  browser: function openBrowser(url, returnOnly) {
    var cmd;
    switch(process.platform) {
    case 'darwin':
      cmd = 'open';
      break;
    case 'win':
    case 'win32':
    case 'win64':
      cmd = 'start';
      break;
    case 'sunos':
      console.log([
        'Launching browser on Solaris is theoritically coded,',
        'please report success or failure on Github.'
      ].join('\n'));
      cmd = '/usr/dt/bin/sdtwebclient';
      break;
    case 'freebsd': // FreeBSD fallbacks to xdg-open
    case 'linux':
    default:
      cmd = 'xdg-open';
      break;
    }

    cmd = cmd + ' ' + url.replace(/"/, '\\"');

    if (returnOnly) {
      return cmd;
    } else {
      exec(cmd);
    }
  }

};

module.exports = exports = Open;
