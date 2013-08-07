'use strict';

var http = require('http'),
    path = require('path'),
    url  = require('url'),
    fs   = require('fs'),
    mime = require(path.join(__dirname, 'mime'));

/**
 * Start server
 *
 * @param  {Number} port
 * @param  {String} root [Optional]
 * @param  {Function} ready [Optional]
 * @return {Server}
 */
var Server = function Server(port, root, ready) {
  ready = (ready?ready:function(){});
  if (['undefined', 'function'].indexOf(typeof root) !== -1) {
    ready = (root?root:function(){});
    root = process.cwd();
  }

  this.root = path.normalize(root);
  this.port = port;
  this.http = http
                .createServer(Server.receive.bind(this))
                .listen(port, ready || function() {});

  return this;
};

/**
 * Handle request
 *
 * @param  {Request} request
 * @param  {Response} response
 */
Server.receive = function(request, response) {
  var uri = request.url;
  if (uri[0] !== '/') {
    uri = '/' + (uri === null ? '' : uri);
  }

  uri = url.parse(uri).pathname;
  uri = url.resolve('/', uri);
  uri = uri.replace(/\/~(\/|$)/g, '/\\~/');
  uri = url.resolve('/', uri);

  var file = path.join(this.root, uri);
  Server.serve(file, response);
};

/**
 * Serve file
 *
 * @param  {String} file
 * @param  {Response} response
 */
Server.serve = function(file, response) {

  fs.readFile(file, function(err, data) {
    var status = 418;
    var contentType = 'text/plain';
    var resBody = 'An Unexpected TeaPot';
    var dataType;

    if (err) {
      if (err.code === 'ENOENT') {
        status = 404;
        resBody = ['GET local ' + file, 'Not Found (404)'].join('\n');
      } else if (err.code === 'EISDIR') {
        if (file[file.length - 1] !== path.sep) {
          file += path.sep;
        }
        file += 'index.html';
        Server.serve(file, response);
        return;
      } else {
        console.log('Unexpected error when serving:', file);
        console.log('Error: =>', err);
        status = 500;
        resBody = err;
      }
    } else {
      contentType = mime.lookup(file);
      status = 200;
      dataType = 'binary';
      resBody = data;
    }
    response.setHeader('Content-Type', contentType);
    response.writeHead(status);
    response.write(resBody, dataType);
    response.end();
  });

};

/**
 * Shutdown
 *
 * @param  {Function} next
 */
Server.prototype.shutdown = function(next) {
  this.http.close(next);
};

module.exports = exports = Server;
