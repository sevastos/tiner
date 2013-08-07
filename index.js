
'use strict';

var path = require('path');
var openBrowser = require(path.join(__dirname, 'lib', 'open-browser'));

var server = require(path.join(__dirname, 'lib', 'server'));
var host = 'localhost';
var port = 3030;
var instance;

// Settings
var pckg = process.env['npm_package_name'];
if (typeof pckg !== 'undefined') {
  var configPort = parseInt(process.env['npm_config_' + pckg + '_port'], 10);
  port = (configPort > 0 ? configPort : port);

  var configHost = process.env['npm_config_' + pckg + '_host'];
  if (typeof configHost !== 'undefined') {
    host = configHost;
  }
}
var argPort = parseInt(process.argv[2], 10);
if (argPort > 0) {
  port = argPort;
}

// Beef
if (typeof process.env.MANUAL === 'undefined') {
  process.env.SILENT = process.env.SILENT || false;
  instance = new server(port, process.cwd(), function() {
    console.log([
      'Asd server started on:',
      'Root Dir:: ' + process.cwd(),
      'Address :: http://' + host + ':' + port + '/',
      'CTRL + C to shutdown'
    ].join('\n'));

    var url = 'http://%host:%port/'
                .replace('%host', host.replace(/"/, '\\"'))
                .replace('%port', port);
    openBrowser(url);
  });
} else {
  process.env.SILENT = process.env.SILENT || true;
}

// Shutdown cleanup
function shutdown() {
  if (instance && !instance.closing && instance.shutdown) {
    instance.closing = true;
    console.log(' Server turning off...  （ˉ‸¯）   ( ¬ º.°)¬    ( ¬`.`)¬');
    instance.shutdown(function() {
      console.log(' Server OFF      (ー。ー) ZzZzz');
    });
  }
}

process.on('SIGINT', shutdown); // undefined
process.on('exit', shutdown);   // 0

module.exports = server;
