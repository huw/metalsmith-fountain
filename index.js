var basename = require('path').basename;
var debug = require('debug')('metalsmith-fountain');
var dirname = require('path').dirname;
var extname = require('path').extname;
var parser = require('./parser');

module.exports = plugin;

/**
 * Metalsmith plugin to convert fountain files.
 *
 * @return {Function}
 */

function plugin() {
  return function(files, metalsmith, done){
    setImmediate(done);
    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);
      if (!fountain(file)) return;
      var data = files[file];
      var dir = dirname(file);
      var html = basename(file, extname(file)) + '.html';
      if ('.' != dir) html = dir + '/' + html;

      debug('converting file: %s', file);
      var stringContents = data.contents.toString();
      var output = parser.parse(stringContents, function(output) {
        var titlePage = output.html.title_page;
        var script = output.html.script;
        var metadataLength = output.metadata.length;

        data.contents = new Buffer(titlePage + script);
        data.fountain = output.metadata;
        debug('added metadata: %s', JSON.stringify(data.fountain));
        delete files[file];
        files[html] = data;
      });
    });
  }
}

/**
 * Check if a `file` is fountain.
 *
 * @param {String} file
 * @return {Boolean}
 */

function fountain(file){
  return /\.fountain/.test(extname(file));
}
