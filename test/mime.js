'use strict';

var path = require('path'),
    mime = require(path.join('..', 'lib', 'mime'))
    ;

describe('Mime', function() {

  it('lookup()', function() {
    mime.lookup('test.appcache').should.equal('text/cache-manifest');
    mime.lookup('mini.test.appcache').should.equal('text/cache-manifest');
    mime.lookup('.mini.test.appcache').should.equal('text/cache-manifest');
    mime.lookup('micro.mini.test.appcache').should.equal('text/cache-manifest');

    mime.lookup('sans.woff').should.equal('application/font-woff');
    mime.lookup('serif.ttf').should.equal('application/x-font-ttf');

    mime.lookup('main.Html').should.equal('text/html');
    mime.lookup('io.wEbm').should.equal('video/webm');

    mime.lookup('css3.HTC').should.equal('text/x-component');

    mime.lookup('noextension').should.equal('application/octet-stream');
    mime.lookup('plainnoextension', 'text/plain').should.equal('text/plain');

  });

});

