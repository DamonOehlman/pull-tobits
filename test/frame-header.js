var test = require('tape');
var pull = require('pull-stream');
var frame = require('../frame');

test('single frame from a single buffer', function(t) {
  t.plan(1);

  pull(
    pull.once(new Buffer('BZh7')),
    frame({ header: '"B":8, Z:8, h:8, comp:8' }),
    pull.drain(function(value) {
      console.log(value);
    })
  );
});