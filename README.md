# autosize-input.js [![npm Version](http://img.shields.io/npm/v/autosize-input.svg?style=flat)](https://www.npmjs.org/package/autosize-input) [![Build Status](https://img.shields.io/travis/yuanqing/autosize-input.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/autosize-input) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/autosize-input.svg?style=flat)](https://coveralls.io/r/yuanqing/autosize-input)

> Effortless, dynamic-width `input` elements in vanilla JavaScript.

## Features

- Dynamically adjusts the width of the text `input` element to fit its current contents
- Can be initialised to fit the element&rsquo;s `placeholder` attribute
- Optionally set a `min-width` based on the element&rsquo;s initial content
- Super lightweight; just 1 KB [minified](autosize-input.min.js), or 0.57 KB minified and gzipped

Under the hood, `autosize-input` uses a hidden &ldquo;dummy&rdquo; `div` (with the same `font-size` and `font-family` as the original `input` element) to determine the correct width to assign to the `input` element.

## Usage

> [**Editable demo**](http://jsfiddle.net/)

```html
<body>
  <input type="text" id="foo" value="Nice">
  <input type="text" id="bar" placeholder="People">
  <input type="text" id="baz" placeholder="Matter">
  <script src="../autosize-input.min.js"></script>
  <script>
    autosizeInput(document.querySelector('#foo'));
    autosizeInput(document.querySelector('#bar'));
    autosizeInput(document.querySelector('#baz'), { minWidth: true });
  </script>
</body>
```

## API

In the browser, `autosizeInput` is a global variable. In Node, do:

```js
var autosizeInput = require('autosize-input');
```

### autosizeInput(elem [, opts])

`elem` is a text `input` element, and `opts` is an object literal.

If we do not want the text box to &ldquo;contract&rdquo; as the user starts to type, set `opts.minWidth` to `true`. This will give `elem` a `min-width` that fits it initial contents (ie. either the element&rsquo;s intial `value`, or its `placeholder`).

See [Usage](#usage).

## Installation

```
$ npm i --save autosize-input
```

```
$ bower i --save yuanqing/autosize-input
```

## License

[MIT](LICENSE)
