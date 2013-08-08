'use strict';

var path = require('path'),
    open = require(path.join('..', 'lib', 'open'))
    ;


describe('Open', function() {

  it('browser()', function() {
    var url = 'http://nodejs.org';
    var oses = ['darwin', 'win32', 'win64', 'win', 'sunos', 'freebsd', 'linux'];
    oses.forEach(function(os) {
      process.platform = os;
      var cmd = open.browser(url, true);
      var urlPos = cmd.indexOf(url);
      urlPos.should.be.above(3);
    });
  });

});

