'use strict';

var http = require('http');
var test = require('tape');
var ecstatic = require('ecstatic');
var Nightmare = require('nightmare');

var PORT = 4242;
var ROOT_DIR = __dirname + '/../';
var FIXTURES_URL = 'http://localhost:' + PORT + '/test/fixtures/';

var fn = function(value, expectedId) {
  // Code run in the browser to check:
  // 1. The value of our `input` field
  // 2. The width of our `input` field against the width of the element with
  // specified `expectedId`
  var input = document.querySelector('input');
  var expected = document.querySelector(expectedId);
  return input.value === value && window.getComputedStyle(input).width === window.getComputedStyle(expected).width;
};

var cb = function(t) {
  // Assert that the `result` returned from `fn` is true.
  return function(result) {
    t.true(result);
  };
};

test('autosize-input', function(t) {

  var browser;
  var server;

  t.test('set up', function(t) {
    t.plan(1);
    browser = new Nightmare();
    server = http.createServer(ecstatic({
      root: ROOT_DIR
    })).listen(PORT, function() {
      t.pass();
    });
  });

  t.test('value', function(t) {
    t.plan(3);
    browser
      .goto(FIXTURES_URL + 'value.html')
      .evaluate(fn, cb(t), '', '#initial')
      .type('input', 'x')
      .evaluate(fn, cb(t), 'x', '#singleLetter')
      .type('input', ' <foo> ')
      .evaluate(fn, cb(t), 'x <foo> ', '#specialCharacters')
      .run();
  });

  t.test('placeholder', function(t) {
    t.plan(3);
    browser
      .goto(FIXTURES_URL + 'placeholder.html')
      .evaluate(fn, cb(t), '', '#initial')
      .type('input', 'x')
      .evaluate(fn, cb(t), 'x', '#singleLetter')
      .type('input', ' <foo> ')
      .evaluate(fn, cb(t), 'x <foo> ', '#specialCharacters')
      .run();
  });

  t.test('placeholder, min-width', function(t) {
    t.plan(3);
    browser
      .goto(FIXTURES_URL + 'placeholder-min-width.html')
      .evaluate(fn, cb(t), '', '#initial')
      .type('input', 'x')
      .evaluate(fn, cb(t), 'x', '#initial')
      .type('input', ' <foo> ')
      .evaluate(fn, cb(t), 'x <foo> ', '#specialCharacters')
      .run();
  });

  t.test('teardown', function(t) {
    t.plan(1);
    server.close(function() {
      t.pass();
    });
  });

});
