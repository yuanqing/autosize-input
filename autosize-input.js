(function () {
  // Compile and cache the needed regular expressions.
  var SPACE = /\s/g
  var LESS_THAN = />/g
  var MORE_THAN = /</g

  // We need to swap out these characters with their character-entity
  // equivalents because we're assigning the resulting string to
  // `ghost.innerHTML`.
  function escape (str) {
    return str.replace(SPACE, '&nbsp;')
              .replace(LESS_THAN, '&lt;')
              .replace(MORE_THAN, '&gt;')
  }

  // Create the `ghost` element, with inline styles to hide it and ensure
  // that the text is all on a single line.
  var GHOST_ELEMENT_ID = '__autosizeInputGhost'
  function createGhostElement () {
    var ghost = document.createElement('div')
    ghost.id = GHOST_ELEMENT_ID
    ghost.style.cssText = 'display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;'
    document.body.appendChild(ghost)
    return ghost
  }

  // Create the `ghost` element.
  var ghost = createGhostElement()

  function autosizeInput (element, options) {
    // Copy all width-affecting styles to the ghost element
    var elementStyle = window.getComputedStyle(element)
    var elementCssText = 'box-sizing:' + elementStyle.boxSizing +
                        ';border-left:' + elementStyle.borderLeftWidth + ' solid black' +
                        ';border-right:' + elementStyle.borderRightWidth + ' solid black' +
                        ';font-family:' + elementStyle.fontFamily +
                        ';font-feature-settings:' + elementStyle.fontFeatureSettings +
                        ';font-kerning:' + elementStyle.fontKerning +
                        ';font-size:' + elementStyle.fontSize +
                        ';font-stretch:' + elementStyle.fontStretch +
                        ';font-style:' + elementStyle.fontStyle +
                        ';font-variant:' + elementStyle.fontVariant +
                        ';font-variant-caps:' + elementStyle.fontVariantCaps +
                        ';font-variant-ligatures:' + elementStyle.fontVariantLigatures +
                        ';font-variant-numeric:' + elementStyle.fontVariantNumeric +
                        ';font-weight:' + elementStyle.fontWeight +
                        ';letter-spacing:' + elementStyle.letterSpacing +
                        ';margin-left:' + elementStyle.marginLeft +
                        ';margin-right:' + elementStyle.marginRight +
                        ';padding-left:' + elementStyle.paddingLeft +
                        ';padding-right:' + elementStyle.paddingRight +
                        ';text-indent:' + elementStyle.textIndent +
                        ';text-transform:' + elementStyle.textTransform

    // Helper function that:
    // 1. Copies `font-family`, `font-size` and other styles of our `element` onto `ghost`.
    // 2. Sets the contents of `ghost` to the specified `str`.
    // 3. Copies the width of `ghost` onto our `element`.
    function set (str) {
      str = str || element.value || element.getAttribute('placeholder') || ''
      // Check if the `ghost` element still exists. If no, create it.
      if (document.getElementById(GHOST_ELEMENT_ID) === null) {
        ghost = createGhostElement()
      }
      ghost.style.cssText += elementCssText
      ghost.innerHTML = escape(str)
      var width = window.getComputedStyle(ghost).width
      element.style.width = width
      return width
    }

    // Call `set` on every `input` event (IE9+).
    element.addEventListener('input', function () {
      set()
    })

    // Initialise the `element` width.
    var width = set()

    // Set `min-width` if `options.minWidth` was set, and only if the initial
    // width is non-zero.
    if (options && options.minWidth && width !== '0px') {
      element.style.minWidth = width
    }

    // Return the `set` function.
    return set
  }

  if (typeof module === 'object') {
    module.exports = autosizeInput
  } else {
    window.autosizeInput = autosizeInput
  }
})()
