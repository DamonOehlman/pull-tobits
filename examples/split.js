var bits = require('../');
var pull = require('pull-stream');
var input = new Buffer([1, 2, 3, 4, 5, 6].join('\n'));

console.log(input);
// --> <Buffer 31 0a 32 0a 33 0a 34 0a 35 0a 36>

pull(
  pull.once(input),
  bits.split('\n'),
  pull.log()
);

// --> <Buffer 31>
// --> <Buffer 32>
// --> <Buffer 33>
// --> <Buffer 34>
// --> <Buffer 35>
// --> <Buffer 36>