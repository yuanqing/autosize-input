# autosize-input.js [![npm Version](http://img.shields.io/npm/v/autosize-input.svg?style=flat)](https://www.npmjs.org/package/autosize-input) [![Build Status](https://img.shields.io/travis/yuanqing/autosize-input.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/autosize-input)

> Effortless, dynamic-width text boxes in vanilla JavaScript.

## Features

- Dynamically adjusts the width of the text box to fit its current contents
- Can be initialised to fit its `placeholder` attribute
- Optionally set a `min-width` based on the element&rsquo;s initial content
- 1.57 KB [minified](autosize-input.min.js), or 0.77 KB minified and gzipped

## Usage

> [**Editable demo**](http://jsfiddle.net/98k622ah/)

```html
<body>
  <input type="text" id="foo" value="Nice">
  <input type="text" id="bar" placeholder="People">
  <input type="text" id="baz" placeholder="Matter">
  <script src="autosize-input.min.js"></script>
  <script>
    autosizeInput(document.querySelector('#foo'));
    autosizeInput(document.querySelector('#bar'));
    autosizeInput(document.querySelector('#baz'), { minWidth: true });
  </script>
</body>
```

## Implementation details

- A hidden &ldquo;ghost&rdquo; `div` &mdash; given the same `font-size`, `font-family`, [`box-sizing`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing), and horizontal `margin`, `border` and `padding` as the text box &mdash; is used to compute the correct width to assign to the text box. This width is recomputed and assigned to the text box on every [`input`](https://developer.mozilla.org/en-US/docs/Web/Events/input) event.

- The single &ldquo;ghost&rdquo; element is shared amongst all the &ldquo;autosized&rdquo; text boxes on the page.

## API

In the browser, `autosizeInput` is a global variable. In Node, do:

```js
const autosizeInput = require('autosize-input');
```

### autosizeInput(element [, options])

`element` is a text `input` element, and `options` is an object literal.

If we do not want the text box to &ldquo;contract&rdquo; as the user starts to type, set `options.minWidth` to `true`. This will give the `element` a `min-width` that fits it initial contents (ie. either the element&rsquo;s intial `value`, or its `placeholder`).

See [Usage](#usage).

## Installation

Install via [npm](https://npmjs.com):

```sh
$ npm install --save autosize-input
```

## Tests

To test manually, in the browser, do:

```sh
$ npm start
```

To run the programmatic tests (in [PhantomJS](http://phantomjs.org/) via [Nightmare](https://github.com/segmentio/nightmare)), do:

```sh
$ npm test
```

## Prior art

- [jQuery.Autosize.Input](https://github.com/MartinF/jQuery.Autosize.Input)
- [React-Input-Autosize](https://github.com/JedWatson/react-input-autosize)

This module was written because I needed a standalone, lightweight solution to this rather common UI problem.

## License

[MIT](LICENSE)
