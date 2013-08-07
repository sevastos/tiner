'use strict';

var path = require('path'),
    mime = require(path.join('..', 'lib', 'mime')),
    expect = require('chai').expect;

describe('Mime', function() {

  it('lookup()', function() {
    expect(mime.lookup('test.appcache')).to.equal('text/cache-manifest');
    expect(mime.lookup('mini.test.appcache')).to.equal('text/cache-manifest');
    expect(mime.lookup('.mini.test.appcache')).to.equal('text/cache-manifest');
    expect(mime.lookup('micro.mini.test.appcache')).to.equal('text/cache-manifest');

    expect(mime.lookup('sans.woff')).to.equal('application/font-woff');
    expect(mime.lookup('serif.ttf')).to.equal('application/x-font-ttf');

    expect(mime.lookup('main.Html')).to.equal('text/html');
    expect(mime.lookup('io.wEbm')).to.equal('video/webm');

    expect(mime.lookup('css3.HTC')).to.equal('text/x-component');
  });

});

