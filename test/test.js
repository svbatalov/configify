var expect = require('chai').expect;
var browserify = require('browserify');
var R = require('stream').Readable;

describe('Browserify JS with underscore template', function () {
  
  var configify = require('../');

  it('should substitute variable from config/default.js', function (done) {
  
    var src = "console.log('<%= ServerAddress %>'); ";
    var s = new R; s.push(src); s.push(null);

    browserify(s)
    .transform(configify)
    .bundle(function (err, src) {
      if (err) return done(err);
      expect(src.toString()).to.include('localhost:4000');
      done();
    });
  });

  it('should substitute variable from config/production.js', function (done) {
  
    process.env['NODE_ENV'] = 'production';
    var src = "console.log('<%= ServerAddress %>'); ";
    var s = new R; s.push(src); s.push(null);
    var configify = require.reload('../');

    browserify(s)
    .transform(configify)
    .bundle(function (err, src) {
      if (err) return done(err);
      expect(src.toString()).to.include('https://test.com');
      done();
    });
  });

  it('should use empty prefix', function (done) {
  
    process.env['NODE_ENV'] = '';
    var src = "console.log('<%= ServerAddress %>'); ";
    var s = new R; s.push(src); s.push(null);
    var configify = require.reload('../');

    browserify(s)
    .transform(configify, {p: true})
    .bundle(function (err, src) {
      if (err) return done(err);
      expect(src.toString()).to.include('localhost:4000');
      done();
    });
  });

  it('should use specified prefix', function (done) {
  
    process.env['NODE_ENV'] = '';
    var src = "console.log('<%= prefix.ServerAddress %>'); ";
    var s = new R; s.push(src); s.push(null);
    var configify = require.reload('../');

    browserify(s)
    .transform(configify, {prefix: 'prefix'})
    .bundle(function (err, src) {
      if (err) return done(err);
      expect(src.toString()).to.include('localhost:4000');
      done();
    });
  });
});

// Hacks to re-require module
// (to account for changed process.env)
// https://gist.github.com/gleitz/6896099
/**
 * Removes a module from the cache.
 */
require.uncache = function (moduleName) {
    // Run over the cache looking for the files
    // loaded by the specified module name
    require.searchCache(moduleName, function (mod) {
        delete require.cache[mod.id];
    });
};
 
/**
 * Runs over the cache to search for all the cached files.
 */
require.searchCache = function (moduleName, callback) {
    // Resolve the module identified by the specified name
    var mod = require.resolve(moduleName);
 
    // Check if the module has been resolved and found within
    // the cache
    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        // Recursively go over the results
        (function run(mod) {
            // Go over each of the module's children and
            // run over it
            mod.children.forEach(function (child) {
                run(child);
            });
 
            // Call the specified callback providing the
            // found module
            callback(mod);
        })(mod);
    }
};
 
/*
 * Load a module, clearing it from the cache if necessary.
 */
require.reload = function(moduleName) {
    require.uncache(moduleName);
    return require(moduleName);
};
