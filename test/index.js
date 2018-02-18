const ecstatic = require('ecstatic')
const glob = require('glob')
const http = require('http')
const path = require('path')
const test = require('tape')

const testSuite = require('./test-suite')

const PORT = 3142

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
