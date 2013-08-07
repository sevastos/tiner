'use strict';
var exec = require('child_process').exec;

/**
 * Open a url on preferable the default Browser
 * @param  {String} url
 */
function openBrowser(url) {
  var cmd;
  switch(process.platform) {
  case 'darwin':
    cmd = 'open';
    break;
  case 'win32':
  case 'win64':
    cmd = 'start';
    break;
  case 'sunos':
    console.log([
      'Launching browser on Solaris is theoritically coded,',
      'please report success or failure on Github.'
    ].join(''));
    cmd = '/usr/dt/bin/sdtwebclient';
    break;
  case 'freebsd':
    console.log('FreeBSD fallbacks to xdg-open for opening browser');
  case 'linux':
  default:
    cmd = 'xdg-open';
    break;
  }

  exec(cmd + ' "' + url + '"');
}

module.exports = openBrowser;
