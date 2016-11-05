const http = require('http')
const path = require('path')
const tape = require('tape')
const ecstatic = require('ecstatic')
const Nightmare = require('nightmare')

const PORT = 4245
const ROOT_DIR = path.resolve(__dirname, '..')
const FIXTURES_URL = 'http://localhost:' + PORT + '/test/fixtures/'

const fn = function (value, expectedId) {
  // Code run in the browser to check:
  // 1. The value of our `input` field.
  // 2. The width of our `input` field against the width of the element with
  // the specified `expectedId`.
  const input = document.querySelector('input')
  const expected = document.querySelector(expectedId)
  const inputWidth = Math.round(parseInt(window.getComputedStyle(input).width))
  const expectedWidth = Math.round(parseInt(window.getComputedStyle(expected).width))
  return {actualValue: input.value, expectedValue: value, actualWidth: inputWidth, expectedWidth: expectedWidth}
}

const nightmareOptions = {
  show: true
}

let server

const setUp = function (t) {
  t.plan(1)
  server = http.createServer(ecstatic({
    root: ROOT_DIR
  })).listen(PORT, function () {
    t.pass()
  })
}

const tearDown = function (t) {
  t.plan(1)
  server.close(function () {
    t.pass()
  })
}

const test = function (name) {
  return function (t) {
    const fixture = FIXTURES_URL + name + '.html'
    console.log(fixture);

    t.test('set up', setUp)

    t.test('initial', function (t) {
      t.plan(2)
      new Nightmare(nightmareOptions)
        .goto(fixture)
        .wait('input')
        .evaluate(fn, '', '#initial')
        .end()
        .then(function (result) {
          console.log(result);
          t.equal(result.actualValue, result.expectedValue)
          t.equal(result.actualWidth, result.expectedWidth)
        })
    })

    t.test('single character', function (t) {
      t.plan(2)
      new Nightmare(nightmareOptions)
        .goto(fixture)
        .wait('input')
        .type('input', 'x')
        .evaluate(fn, 'x', '#singleCharacter')
        .end()
        .then(function (result) {
          console.log(result);
          t.equal(result.actualValue, result.expectedValue)
          t.equal(result.actualWidth, result.expectedWidth)
        })
    })

    t.test('special characters', function (t) {
      t.plan(2)
      new Nightmare(nightmareOptions)
        .goto(fixture)
        .wait('input')
        .type('input', 'x <foo> ')
        .evaluate(fn, 'x <foo> ', '#specialCharacters')
        .end()
        .then(function (result) {
          console.log(result);
          t.equal(result.actualValue, result.expectedValue)
          t.equal(result.actualWidth, result.expectedWidth)
        })
    })

    t.test('tear down', tearDown)
  }
}

// tape('value', test('value'))
// tape('placeholder', test('placeholder'))
// tape('placeholder, min-width', test('placeholder-min-width'))
tape('border-box', test('border-box'))
