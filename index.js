
'use strict';

var path = require('path');
var open = require(path.join(__dirname, 'lib', 'open'));

var server = require(path.join(__dirname, 'lib', 'server'));
var host = 'localhost';
var port = parseInt(process.env.TINER_PORT, 10) || 3030;
var instance;

//TODO: Better settings

// Settings from NPM config
var pckg = process.env['npm_package_name'];
if (typeof pckg !== 'undefined') {
  var configPort = parseInt(process.env['npm_config_' + pckg + '_port'], 10);
  port = (configPort > 0 ? configPort : port);

  var configHost = process.env['npm_config_' + pckg + '_host'];
  if (typeof configHost !== 'undefined') {
    host = configHost;
  }
}

// Settings from cmd args
var argPort = parseInt(process.argv[2], 10);
if (argPort > 0) {
  port = argPort;
}

// Beef
if (typeof process.env.MANUAL === 'undefined') {
  process.env.SILENT = process.env.SILENT || '';
  instance = new server(port, process.cwd(), function() {
    if (!process.env.SILENT) {
      console.log([
        'Tiner listening on:',
        'Root Dir:: ' + process.cwd(),
        'Address :: http://' + host + ':' + port + '/',
        'CTRL + C to shutdown'
      ].join('\n'));
    }

    var url = 'http://' + host + ':' + port;
    open.browser(url);
  });
} else {
  process.env.SILENT = process.env.SILENT || 1;
}

// Shutdown cleanup
function shutdown() {
  if (instance && !instance.closing && instance.shutdown) {
    instance.closing = true;
    if (!process.env.SILENT) {
      console.log(' Server turning off...  （ˉ‸¯）   ( ¬ º.°)¬    ( ¬`.`)¬');
    }
    instance.shutdown(function() {
      if (!process.env.SILENT) {
        console.log(' Server OFF      (ー。ー) ZzZzz');
      }
    });
  }
}

process.on('SIGINT', shutdown); // undefined
process.on('exit', shutdown);   // 0

module.exports = server;
