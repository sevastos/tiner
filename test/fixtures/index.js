var path = require('path');

var rootsBase = __dirname + path.sep;
var roots = {};

// Fixture components
var replyNotFound = {
  'Status-Code': 404,
  'Content-Type': /plain/,
  'Content': /Not Found/i
};

var contentTypeHtml = /html/;

// Declare cases
roots[rootsBase + 'root-empty'] = {};
roots[rootsBase + 'root-index'] = {};
roots[rootsBase + 'root-single'] = {};


/************
 * GET /
 ************/
roots[rootsBase + 'root-empty']['/'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-index']['/'] = {
  'reply': {
    'Status-Code': 200,
    'Content-Type': contentTypeHtml,
    'Content': 'index-test'
  }
};
roots[rootsBase + 'root-single']['/'] = {
  'reply': replyNotFound
};

/************
 * GET /index.html
 ************/
roots[rootsBase + 'root-empty']['/index.html'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-index']['/index.html'] = {
  'reply': {
    'Status-Code': 200,
    'Content-Type': contentTypeHtml,
    'Content': 'index-test'
  }
};
roots[rootsBase + 'root-single']['/index.html'] = {
  'reply': replyNotFound
};

/************
 * GET /nothing
 ************/
roots[rootsBase + 'root-empty']['/nothing'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-index']['/nothing'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-single']['/nothing'] = {
  'reply': replyNotFound
};

/************
 * GET /../outofroot.html
 ************/
roots[rootsBase + 'root-empty']['/../outofroot.html'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-index']['/../outofroot.html'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-single']['/../outofroot.html'] = {
  'reply': replyNotFound
};

/************
 * GET /~
 ************/
roots[rootsBase + 'root-empty']['/~'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-index']['/~'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-single']['/~'] = {
  'reply': replyNotFound
};

/************
 * GET /~/.bashrc
 ************/
roots[rootsBase + 'root-empty']['/~/.bashrc'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-index']['/~/.bashrc'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-single']['/~/.bashrc'] = {
  'reply': replyNotFound
};

/************
 * GET /~user
 ************/
roots[rootsBase + 'root-empty']['/~user'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-index']['/~user'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-single']['/~user'] = {
  'reply': {
    'Status-Code': 200,
    'Content-Type': contentTypeHtml,
    'Content': 'single-user-index-test'
  }
};

/************
 * GET /example/../index.html
 ************/
roots[rootsBase + 'root-empty']['/example/../index.html'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-index']['/example/../index.html'] = {
  'reply': {
    'Status-Code': 200,
    'Content-Type': contentTypeHtml,
    'Content': 'index-test'
  }
};
roots[rootsBase + 'root-single']['/example/../index.html'] = {
  'reply': replyNotFound
};

/************
 * GET /example/advanced/../index.html
 ************/
roots[rootsBase + 'root-empty']['/example/advanced/../index.html'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-index']['/example/advanced/../index.html'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-single']['/example/advanced/../index.html'] = {
  'reply': replyNotFound
};

/************
 * GET /single.html
 ************/
roots[rootsBase + 'root-empty']['/single.html'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-index']['/single.html'] = {
  'reply': replyNotFound
};
roots[rootsBase + 'root-single']['/single.html'] = {
  'reply': {
    'Status-Code': 200,
    'Content-Type': contentTypeHtml,
    'Content': 'single-test'
  }
};


exports.roots = roots;
