(function(root) {

  'use strict';

  // Reuse compiled regular expressions.
  var SPACE = /\s/g;
  var LESS_THAN = /\>/g;
  var MORE_THAN = /</g;

  // We need to swap out these characters with their character-entity
  // equivalents because we're assigning the resulting string to
  // `spacer.innerHTML`.
  function escape(str) {
    return str.replace(SPACE, '&nbsp;')
              .replace(LESS_THAN, '&lt;')
              .replace(MORE_THAN, '&gt;');
  }

  // Inline styles to hide our `spacer` element.
  var spacerStyle = 'box-sizing:content-box;display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap';

  function autosizeInput(elem, opts) {

    // Create the `spacer`.
    var spacer = document.createElement('div');
    document.body.appendChild(spacer);

    // Apply the `font-size` and `font-family` styles of `elem` on the `spacer`.
    var elemStyle = window.getComputedStyle(elem);
    var cssText = spacerStyle +
      ';font-family:' + elemStyle.fontFamily +
      ';font-size:'   + elemStyle.fontSize;
    spacer.style.cssText = cssText;

    // Helper function that sets the contents of `spacer` to `str`, before
    // copying the new width of `spacer` to `elem`.
    function set(str) {
      spacer.innerHTML = escape(str);
      var width = window.getComputedStyle(spacer).width;
      elem.style.width = width;
      return width;
    }

    // Set the initial value of `spacer` to the `value` or `placeholder` of
    // `elem`.
    var width = set(elem.value || elem.getAttribute('placeholder') || '');

    // Call `set` on every `input` event (IE9+).
    elem.addEventListener('input', function(e) {
      set(e.target.value);
    });

    // Set `min-width` if `opts.minWidth` was set.
    if (opts && opts.minWidth) {
      spacer.style.minWidth = width;
    }
  }

  /* istanbul ignore else */
  if (typeof module == 'object') {
    module.exports = autosizeInput;
  } else {
    root.autosizeInput = autosizeInput;
  }

})(this);
