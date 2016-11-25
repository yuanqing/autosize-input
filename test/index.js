var http = require('http')
var path = require('path')
var tape = require('tape')
var ecstatic = require('ecstatic')
var Nightmare = require('nightmare')

var PORT = 4242
var ROOT_DIR = path.resolve(__dirname, '..')
var FIXTURES_URL = 'http://localhost:' + PORT + '/test/fixtures/'

var fn = function (value, expectedId) {
  // Code run in the browser to check:
  // 1. The value of our `input` field.
  // 2. The width of our `input` field against the width of the element with
  // the specified `expectedId`.
  var input = document.querySelector('input')
  var expected = document.querySelector(expectedId)
  var inputWidth = Math.round(parseInt(window.getComputedStyle(input).width))
  var expectedWidth = Math.round(parseInt(window.getComputedStyle(expected).width))
  return input.value === value && inputWidth === expectedWidth
}

var nightmareOptions = {
  show: true
}

var server

var setUp = function (t) {
  t.plan(1)
  server = http.createServer(ecstatic({
    root: ROOT_DIR
  })).listen(PORT, function () {
    t.pass()
  })
}

var tearDown = function (t) {
  t.plan(1)
  server.close(function () {
    t.pass()
  })
}

var test = function (name) {
  return function (t) {
    var fixture = FIXTURES_URL + name + '.html'

    t.test('set up', setUp)

    t.test('initial', function (t) {
      t.plan(1)
      new Nightmare(nightmareOptions)
        .goto(fixture)
        .wait('input')
        .evaluate(fn, '', '#initial')
        .end()
        .then(function (result) {
          t.true(result)
        })
    })

    t.test('single character', function (t) {
      t.plan(1)
      new Nightmare(nightmareOptions)
        .goto(fixture)
        .wait('input')
        .type('input', 'x')
        .evaluate(fn, 'x', '#singleCharacter')
        .end()
        .then(function (result) {
          t.true(result)
        })
    })

    t.test('special characters', function (t) {
      t.plan(1)
      new Nightmare(nightmareOptions)
        .goto(fixture)
        .wait('input')
        .type('input', 'x <foo> ')
        .evaluate(fn, 'x <foo> ', '#specialCharacters')
        .end()
        .then(function (result) {
          t.true(result)
        })
    })

    t.test('tear down', tearDown)
  }
}

tape('value', test('value'))
tape('placeholder', test('placeholder'))
tape('placeholder, min-width', test('placeholder-min-width'))
tape('border-box', test('border-box'))
