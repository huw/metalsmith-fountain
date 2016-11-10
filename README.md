
# metalsmith-fountain

  A Metalsmith plugin to convert [fountain](http://fountain.io) screenplay files.

  This is based on a modified parser from Matt Daly's [Fountain.js](https://github.com/mattdaly/Fountain.js)

## Installation

    $ npm install metalsmith-fountain

## Usage

  There are no options for this plugin. However, it will add most fountain metadata, accessible from the `fountain` object.

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
  }
  ```

## License

  MIT
