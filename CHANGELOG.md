# Changelog

## 0.4.0
- Stop setting `box-sizing: content-box` on the input element
- Copy other width-affecting styles (eg. `letter-spacing`) to the &ldquo;ghost&rdquo; element

## 0.3.1
- Assign an `id` to the &ldquo;ghost&rdquo; element, and use `document.getElementById` to detect if the element still exists in the DOM

## 0.3.0
- Account for case where the &ldquo;ghost&rdquo; element may have been removed from the DOM

## 0.2.0
- Share a single &ldquo;ghost&rdquo; element, as opposed to creating a new &ldquo;ghost&rdquo; element for every text box

## 0.1.1
- Return the `set` function

## 0.1.0
- Initial release
