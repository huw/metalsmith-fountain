var basename = require('path').basename;
var debug = require('debug')('metalsmith-fountain');
var dirname = require('path').dirname;
var extname = require('path').extname;
var parser = require('./parser');

module.exports = plugin;

/**
 * Metalsmith plugin to convert fountain files.
 *
 * @param {Object} [options]
 *  @property {Boolean} [title_page=true] - Whether to include HTML for the title page in the output file
 *  @property {Boolean} [content_metadata=false] - Whether to include the HTML for the title page and script in metalsmith metadata (may be large!)
 *  @property {Boolean} [preserve_title=false] - Whether to override the `title` attribute in the metalsmith metadata
 *  @property {Boolean} [preserve_date=false] - Whether to override the `date` attribute in the metalsmith metadata. Automatically chooses `date` if available, then `draft_date`.
 * @return {Function}
 */

function plugin(options) {
  options = options || {};
  var title_page = true;
  var content_metadata = false;
  var preserve_title = false;
  var preserve_date = false;

  if (typeof options.title_page !== "undefined") title_page = options.title_page
  if (typeof options.content_metadata !== "undefined") content_metadata = options.content_metadata
  if (typeof options.preserve_title !== "undefined") preserve_title = options.preserve_title
  if (typeof options.preserve_date !== "undefined") preserve_date = options.preserve_date

  return function(files, metalsmith, done) {
    setImmediate(done);

    Object.keys(files).forEach(function(file) {
      debug('checking file: %s', file);
      if (!fountain(file)) return;

      var data = files[file];
      var dir = dirname(file);
      var html = basename(file, extname(file)) + '.html';

      if ('.' != dir) html = dir + '/' + html;

      debug('converting file: %s', file);
      var stringContents = data.contents.toString();

      var output = parser.parse(stringContents, function(output) {
        var titlePageHTML = output.html.title_page;
        var scriptHTML = output.html.script;

        if (title_page) {
          debug('title_page is true');
          data.contents = new Buffer(titlePageHTML + scriptHTML);
        } else {
          debug('title_page is false');
          data.contents = new Buffer(scriptHTML);
        }

        data.fountain = output.metadata;

        if (content_metadata) {
          data.fountain.contents = {
            title_page: titlePage,
            script: script
          };
        }

        if (!preserve_title && output.metadata.title) {
          data.title = output.metadata.title;
        }

        if (!preserve_date) {
          if (output.metadata.date) {
            data.date = output.metadata.date;
          } else if (output.metadata.draft_date) {
            data.date = output.metadata.draft_date;
          }
        }

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
