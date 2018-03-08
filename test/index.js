const ecstatic = require('ecstatic')
const glob = require('glob')
const http = require('http')
const path = require('path')
const test = require('tape')

const testSuite = require('./test-suite')

<<<<<<< HEAD
var fn = function (value, expectedId) {
  // Code run in the browser to check:
  // 1. The value of our `input` field.
  // 2. The width of our `input` field against the width of the element with
  // the specified `expectedId`.
  var input = document.querySelector('input')
  var expected = document.querySelector(expectedId)
  var inputWidth = Math.round(parseInt(window.getComputedStyle(input).width))
  var expectedWidth = Math.round(parseInt(window.getComputedStyle(expected).width) + 2)
  return input.value === value && inputWidth === expectedWidth
}
=======
const PORT = 3142
>>>>>>> 554ca1c8cef9e21af05102304e46af6ca341fc7d

let server

test('set up', function (t) {
  t.plan(1)
  server = http
    .createServer(
      ecstatic({
        root: path.resolve(__dirname, '..')
      })
    )
    .listen(PORT, function () {
      t.pass()
    })
})

glob.sync('fixtures/*.html', { cwd: __dirname }).forEach(function (fixture) {
  testSuite(`http://0.0.0.0:${PORT}/test/${fixture}`)
})

test('tear down', function (t) {
  t.plan(1)
  server.close(function () {
    t.pass()
  })
})
