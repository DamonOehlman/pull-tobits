var path = require('path');
var test = require('tape');
var pull = require('pull-stream');
var file = require('pull-file');
var bits = require('../');

test('small file split', function(t) {
  var expected = ['a', 'b', 'c', 'd', 'e'];

  t.plan(expected.length);

  pull(
    file(path.resolve(__dirname, 'assets', 'multiline.txt')),
    bits.split('\n'),
    pull.drain(function(value) {
      t.equal(value.toString(), expected.shift());
    })
  );
});

test('small file split (constrain buffer size)', function(t) {
  var expected = ['this', 'is', 'a', 'test of multiline splits', 'yeah it is', '!'];

  t.plan(expected.length);

  pull(
    file(path.resolve(__dirname, 'assets', 'multiline2.txt'), { bufferSize: 2 }),
    bits.split('\n'),
    pull.drain(function(value) {
      t.equal(value.toString(), expected.shift());
    })
  );
});

test('unicode', function(t) {
  t.plan(48);

  pull(
    file(path.resolve(__dirname, 'assets', 'BV.txt')),
    bits.split('\n'),
    pull.drain(function(value) {
      t.pass('got value');
    })
  );
});
