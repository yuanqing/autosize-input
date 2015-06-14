(function(root) {

  'use strict';

  // Compile and cache the needed regular expressions.
  var SPACE = /\s/g;
  var LESS_THAN = /\>/g;
  var MORE_THAN = /</g;

  // We need to swap out these characters with their character-entity
  // equivalents because we're assigning the resulting string to
  // `ghost.innerHTML`.
  function escape(str) {
    return str.replace(SPACE, '&nbsp;')
              .replace(LESS_THAN, '&lt;')
              .replace(MORE_THAN, '&gt;');
  }

  // Inline styles to hide the `ghost` element.
  var ghostStyle = 'box-sizing:content-box;display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap';

  function autosizeInput(elem, opts) {

    // Force `content-box` on the `elem`.
    elem.style.boxSizing = 'content-box';

    // Create the `ghost` element.
    var ghost = document.createElement('div');
    document.body.appendChild(ghost);

    // Apply the `font-size` and `font-family` styles of `elem` on the
    // `ghost` element.
    var elemStyle = window.getComputedStyle(elem);
    ghost.style.cssText = ghostStyle +
      ';font-family:' + elemStyle.fontFamily +
      ';font-size:'   + elemStyle.fontSize;

    // Helper function that sets the contents of `ghost` to `str`, before
    // copying the new width of `ghost` to `elem`.
    function set(str) {
      str = str || elem.value || elem.getAttribute('placeholder') || '';
      ghost.innerHTML = escape(str);
      var width = window.getComputedStyle(ghost).width;
      elem.style.width = width;
      return width;
    }

    // Call `set` on every `input` event (IE9+).
    elem.addEventListener('input', function() {
      set();
    });

    // Set the initial value of `ghost` to the `value` or `placeholder`
    // of `elem`.
    var width = set();

    // Set `min-width` if `opts.minWidth` was set, and only if the initial
    // width is non-zero.
    if (opts && opts.minWidth && width !== '0px') {
      ghost.style.minWidth = width;
    }

    return set;
  }

  if (typeof module == 'object') {
    module.exports = autosizeInput;
  } else {
    root.autosizeInput = autosizeInput;
  }

})(this);
