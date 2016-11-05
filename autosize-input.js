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
    document.body.appendChild(ghost)
    return ghost
  }

  // Create the `ghost` element.
  var ghost = createGhostElement()

  function autosizeInput (element, options) {
    // Apply the `font-size` and `font-family` styles of `element` on the
    // `ghost` element.
    var elementStyle = window.getComputedStyle(element)
    var elementCssText = 'font-family:' + elementStyle.fontFamily +
                        ';font-size:' + elementStyle.fontSize +
                        ';box-sizing:' + elementStyle.boxSizing +
                        ';display:' + elementStyle.display +
                        // TODO: Verify these cover padding left/right/etc
                        // TODO: Remove top/bottom styles as we don't need them
                        ';padding-top:' + elementStyle.paddingTop +
                        ';padding-right:' + elementStyle.paddingRight +
                        ';padding-bottom:' + elementStyle.paddingBottom +
                        ';padding-left:' + elementStyle.paddingLeft +
                        ';border-top:' + elementStyle.borderTopWidth + ' solid black' +
                        ';border-right:' + elementStyle.borderRightWidth + ' solid black' +
                        ';border-bottom:' + elementStyle.borderBottomWidth + ' solid black' +
                        ';border-left:' + elementStyle.borderLeftWidth + ' solid black' +
                        ';margin-top:' + elementStyle.marginTop +
                        ';margin-right:' + elementStyle.marginRight +
                        ';margin-bottom:' + elementStyle.marginBottom +
                        ';margin-left:' + elementStyle.marginLeft

    // Helper function that:
    // 1. Copies the `font-family` and `font-size` of our `element` onto `ghost`.
    // 2. Sets the contents of `ghost` to the specified `str`.
    // 3. Copies the width of `ghost` onto our `element`.
    function set (str) {
      str = str || element.value || element.getAttribute('placeholder') || ''
      // Check if the `ghost` element still exists. If no, create it.
      if (document.getElementById(GHOST_ELEMENT_ID) === null) {
        ghost = createGhostElement()
      }
      ghost.style.cssText = 'height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;' + elementCssText
      ghost.innerHTML = escape(str)
      var ghostStyle = window.getComputedStyle(ghost)
      var width = parseInt(ghostStyle.width, 10)
      // if (elementStyle.boxSizing === 'border-box') {
      //   console.log('wat2', width)
      //   width += parseInt(ghostStyle.borderLeftWidth, 10)
      //   console.log('wat2', ghostStyle.borderLeftWidth)
      //   width += parseInt(ghostStyle.borderRightWidth, 10)
      //   console.log('wat2', width)
      //   console.log('wat2', width)
      // }
      width = width.toString() + 'px'
      console.log('wat', width);
      element.style.width = width + 'px'
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
