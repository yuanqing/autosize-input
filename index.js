var GHOST_ELEMENT_ID = '__autosizeInputGhost'

var characterEntities = {
  ' ': 'nbsp',
  '<': 'lt',
  '>': 'gt'
}
function mapSpecialCharacterToCharacterEntity (specialCharacter) {
  return '&' + characterEntities[specialCharacter] + ';'
}
function escapeSpecialCharacters (string) {
  return string.replace(/\s|<|>/g, mapSpecialCharacterToCharacterEntity)
}

// Create `ghostElement`, with inline styles to hide it and ensure that the text is all
// on a single line.
function createGhostElement () {
  var ghostElement = document.createElement('div')
  ghostElement.id = GHOST_ELEMENT_ID
  ghostElement.style.cssText =
    'display:inline-block;height:0;overflow:hidden;position:absolute;top:0;visibility:hidden;white-space:nowrap;'
  document.body.appendChild(ghostElement)
  return ghostElement
}

module.exports = function (element, options) {
  var elementStyle = window.getComputedStyle(element)
  // prettier-ignore
  var elementCssText = 'box-sizing:' + elementStyle.boxSizing +
                      ';border-left:' + elementStyle.borderLeftWidth + ' solid red' +
                      ';border-right:' + elementStyle.borderRightWidth + ' solid red' +
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

  // Assigns an appropriate width to the given `element` based on its contents.
  function setWidth () {
    var string = element.value || element.getAttribute('placeholder') || ''
    // Check if the `ghostElement` exists. If no, create it.
    var ghostElement =
      document.getElementById(GHOST_ELEMENT_ID) || createGhostElement()
    // Copy all width-affecting styles to the `ghostElement`.
    ghostElement.style.cssText += elementCssText
    ghostElement.innerHTML = escapeSpecialCharacters(string)
    // Copy the width of `ghostElement` to `element`.
    var width = window.getComputedStyle(ghostElement).width
    element.style.width = width
    return width
  }

  element.addEventListener('input', setWidth)

  var width = setWidth()

  // Set `min-width` only if `options.minWidth` was set, and only if the initial
  // width is non-zero.
  if (options && options.minWidth && width !== '0px') {
    element.style.minWidth = width
  }

  // Return a function for unbinding the event listener and removing the `ghostElement`.
  return function () {
    element.removeEventListener('input', setWidth)
    var ghostElement = document.getElementById(GHOST_ELEMENT_ID)
    if (ghostElement) {
      ghostElement.parentNode.removeChild(ghostElement)
    }
  }
}
