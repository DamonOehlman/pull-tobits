# pull-tobits

This is a suite of [pull-stream](https://github.com/dominictarr/pull-stream)
throughs that are used to manipulate an incoming buffer into component
parts. In a very simple case it could be used to split a file on 
newline characters (`\n`).  In a more complicated case it could be used
to identify separate chunks in a [bzip2](http://en.wikipedia.org/wiki/Bzip2)
compressed file.


[![NPM](https://nodei.co/npm/pull-tobits.png)](https://nodei.co/npm/pull-tobits/)

[![Build Status](https://travis-ci.org/DamonOehlman/pull-tobits.png?branch=master)](https://travis-ci.org/DamonOehlman/pull-tobits)

## Reference

### split

```js
split(delimiter)
```

The following is a pretty contrived example, but demonstrates the idea:

```js
var bits = require('pull-tobits');
var pull = require('pull-stream');
var lines = [1, 2, 3, 4, 5, 6].join('\n');

pull(
  pull.values([new Buffer(lines)]),
  bits.split('\n'),
  pull.log()
);
```

## License(s)

### MIT

Copyright (c) 2013 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
