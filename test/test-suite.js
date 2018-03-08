const nightmare = require('nightmare')
const test = require('tape')

function browser (url) {
  return nightmare({ show: true })
    .goto(url)
    .wait('input')
}

function evaluate (expectedId) {
  const inputElement = document.querySelector('input')
  const expectedElement = document.querySelector(expectedId)
  return {
    inputElementWidth: Math.round(
      parseInt(window.getComputedStyle(inputElement).width)
    ),
    expectedElementWidth: Math.round(
      parseInt(window.getComputedStyle(expectedElement).width)
    )
  }
}

module.exports = function (url) {
  test('empty', function (t) {
    t.plan(1)
    browser(url)
      .evaluate(evaluate, '#empty')
      .end()
      .then(function (result) {
        t.equal(result.inputElementWidth, result.expectedElementWidth)
      })
  })

  test('single character', function (t) {
    t.plan(1)
    browser(url)
      .type('input', 'x')
      .evaluate(evaluate, '#single-character')
      .end()
      .then(function (result) {
        t.equal(result.inputElementWidth, result.expectedElementWidth)
      })
  })

  test('multiple characters', function (t) {
    t.plan(1)
    browser(url)
      .type('input', 'x <foo> ')
      .evaluate(evaluate, '#multiple-characters')
      .end()
      .then(function (result) {
        t.equal(result.inputElementWidth, result.expectedElementWidth)
      })
  })
}
