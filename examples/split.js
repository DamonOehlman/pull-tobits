var bits = require('../');
var pull = require('pull-stream');
var lines = [1, 2, 3, 4, 5, 6].join('\n');

pull(
  pull.values([new Buffer(lines)]),
  bits.split('\n'),
  pull.log()
);

// --> <Buffer 31>
// --> <Buffer 32>
// --> <Buffer 33>
// --> <Buffer 34>
// --> <Buffer 35>
// --> <Buffer 36>