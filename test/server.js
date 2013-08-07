'use strict';

var asd = require('..'),
    path = require('path'),
    request = require('supertest'),
    fixtures = require(path.join(__dirname, 'fixtures')),
    roots = fixtures.roots,
    urlPaths = Object.keys(roots[Object.keys(roots).pop()])
    ;


describe('Server', function() {
  var servers = [];

  beforeEach(function(done) {
    servers = [];
    var queue = Object.keys(roots).length;
    Object.keys(roots).forEach(function(root) {
      servers.push(new asd(30303 + servers.length, root));
      return (--queue ? '' : done());
    });
  });

  afterEach(function(done) {
    var running = servers.length;
    servers.forEach(function(server, index) {
      server.shutdown(function() {
        servers[index] = undefined;
        return (--running ? '' : done());
      });
    });
  });

  it('listen()', function() {
    servers.forEach(function(server) {
      server.should.be.a('object');
    });
  });


  describe('reply()', function() {

    urlPaths.forEach(function(urlPath) {
      it(urlPath, function(done) {
        var runs = servers.length;
        servers.forEach(function(server) {
          var fixture = roots[server.root][urlPath].reply;
          request(server.http)
            .get(urlPath)
            .expect(fixture['Status-Code'], fixture['Content'])
            .expect('Content-Type', fixture['Content-Type'])
            .end(function(err) {
              if (err) return done(err);
              return (--runs ? '' : done());
            });
        });
      });
    });

  });




});

