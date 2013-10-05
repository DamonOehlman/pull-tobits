var bits = require('../');
var pull = require('pull-stream');
var lines = [1, 2, 3, 4, 5, 6].join('\n');

pull(
  pull.values([new Buffer(lines)]),
  bits.split('\n'),
  pull.log()
);