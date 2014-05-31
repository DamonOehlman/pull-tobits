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
  var expected = [
    'this',
    'is',
    'a',
    'test of multiline splits',
    'yeah it is',
    '!'
  ];

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
  var ids = [
    3371096, 3371097, 3371098, 3371099, 3371100, 3371101, 3371102, 3371103,
    3371104, 3371105, 3371106, 3371107, 3371108, 3371109, 3371110, 3371111,
    3371112, 3371113, 3371114, 3371115, 3371116, 3371117, 3371118, 3371119,
    3371120, 3371121, 3371122, 3371123, 3371124, 3371125, 3371177, 3371178,
    3371179, 3371180, 3371181, 3371182, 3371183, 3371184, 3371185, 3371186,
    3371187, 3371188, 3371189, 3371190, 3371191, 3371192, 3371214, 6620379
  ];

  t.plan(ids.length);

  pull(
    file(path.resolve(__dirname, 'assets', 'BV.txt')),
    bits.split('\n'),
    pull.drain(function(value) {
      var id = parseInt(value.slice(0, 7), 10);

      t.equal(id, ids.shift(), 'got expected id');
    })
  );
});

test('largefile split', function(t) {
  t.plan(1);
  pull(
    file(path.resolve(__dirname, 'assets', 'AU.txt')),
    bits.split([0x0A]),
    pull.collect(function(err, values) {
      t.equal(values.length, 105367, 'got expected count');
    })
  );
});
