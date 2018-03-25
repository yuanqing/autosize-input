# autosize-input [![npm Version](http://img.shields.io/npm/v/autosize-input.svg?style=flat)](https://www.npmjs.org/package/autosize-input) [![Build Status](https://img.shields.io/travis/yuanqing/autosize-input.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/autosize-input)

> Effortless, dynamic-width text boxes in vanilla JavaScript.

- Dynamically adjusts the width of the text box to fit its current contents
- Can be initialised to fit its `placeholder` attribute
- Optionally set a `min-width` based on the element&rsquo;s initial content
- 718 bytes gzipped

## Usage

> [**Editable demo (CodePen)**](https://codepen.io/lyuanqing/pen/xYpmKj)

```html
<input type="text" id="foo" value="Nice">
<input type="text" id="bar" placeholder="People">
<input type="text" id="baz" placeholder="Matter">
```

```js
const autosizeInput = require('autosize-input')

autosizeInput(document.querySelector('#foo'))
autosizeInput(document.querySelector('#bar'))
autosizeInput(document.querySelector('#baz'), { minWidth: true })
```

## API

```js
const autosizeInput = require('autosize-input')
```

### autosizeInput(element [, options])

`element` is a text `input` element, and `options` is an object literal.

- Returns a &ldquo;clean up&rdquo; function for removing the event listener on the `element`.
- If we do not want the text box to &ldquo;contract&rdquo; as the user starts to type, set `options.minWidth` to `true`. This will give the `element` a `min-width` that fits it initial contents (ie. either the element&rsquo;s intial `value`, or its `placeholder`).

See [Usage](#usage).

## Implementation details

- A hidden &ldquo;ghost&rdquo; `div` element, assigned the same styles as the text box, is used to calculate the correct width to assign to the text box. This width is recomputed and assigned to the text box on every [`input`](https://developer.mozilla.org/en-US/docs/Web/Events/input) event.
- The single &ldquo;ghost&rdquo; `div` is shared amongst all the &ldquo;autosized&rdquo; text boxes on the page.

## Installation

Install via [yarn](https://yarnpkg.com):

```sh
$ yarn add autosize-input
```

Or [npm](https://npmjs.com):

```sh
$ npm install --save autosize-input
```

## Tests

To test manually, in the browser:

```sh
$ yarn start
```

To run the programmatic tests:

```sh
$ yarn test
```

## Prior art

- [jQuery.Autosize.Input](https://github.com/MartinF/jQuery.Autosize.Input)
- [React-Input-Autosize](https://github.com/JedWatson/react-input-autosize)

This module was written because I needed a standalone, lightweight solution to this rather UI problem.

## License

[MIT](LICENSE.md)
