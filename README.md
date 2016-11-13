
# metalsmith-fountain
  [![npm](https://img.shields.io/npm/v/metalsmith-fountain.svg)](https://www.npmjs.com/package/metalsmith-fountain)

  A Metalsmith plugin to convert [Fountain](http://fountain.io) screenplay files.

  This is based on a modified parser from Matt Daly's [Fountain.js](https://github.com/mattdaly/Fountain.js)

## Installation

    $ npm install metalsmith-fountain

## Options

   * `title_page`: Whether to include HTML for the title page in the output file (optional, default: `true`)
   *  `content_metadata`: Whether to include the HTML for the title page and script in metalsmith metadata (may be large!) (optional, default: `false`)
   *  `preserve_title`: Whether to override the `title` attribute in the metalsmith metadata (optional, default: `false`)
   *  `preserve_date`: Whether to override the `date` attribute in the metalsmith metadata. Automatically chooses `date` if available, then `draft_date` (optional, default `false`)

## Usage

  This plugin will add most Fountain metadata, accessible from the `fountain` object in Metalsmith's metadata. YAML front-matter is supported alongside Fountain metadata, like so:

  ```
  ---
  title: Big Fish
  credit: written by
  author: John August
  ---
  Title: Big Fish
  Credit: written by
  Author: John August
  ...
  ```

  Although any key and value can be used in the front-matter, only the following keys will be read from the Fountain metadata into the `fountain` object like so:

  ```
  fountain: {
    title: 'Title'
    credit: 'Credit Line'
    author: 'Author'
    authors: 'Authors'
    source: 'Source'
    notes: 'Notes'
    draft_date: 'Draft Date'
    date: 'Date'
    contact: 'Contact Details'
    copyright: 'Copyright'
    content: {  
      // Only if enabled with the `content_metadata` flag!
      title_page: '<h1>Title</h1><etc/>',
      script: '<p>HTML content of the script</p>'
    }
  }
  ```

  By default, the `title` and `date` attributes in Metalsmith's metadata will also be overridden with values from the Fountain metadata (where `date` takes priority over `draft_date` if both are present). To disable this, set `preserve_title` and `preserve_date` to false, respectively.

## Styling

  This [example](https://gist.github.com/huw/43b9199a4463984d9791f8fb3beda22a) responsively styles most of the output HTML. Currently, it is recommended to look at that example and the output HTML to get a sense of what to style.

## License

  MIT
