var through = require('through');
var config = require('config');
var _ = require('underscore');

module.exports = function (filename, options) {

  var conf = {};
  var p = options.p || options.prefix;

  (p === true) && (conf = config) ||
  (p && ( conf[p] = config) ) ||
  (conf = { conf: config });
  
  var body = "";

  function write (chunk) {
    body += chunk.toString();
  }

  function end () {
    this.queue( _.template(body)(conf));
    return this.queue(null);
  }

  return through(write, end);
};
