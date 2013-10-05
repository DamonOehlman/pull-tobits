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

### frame

```js
frame(opts)
```

__Under development__

Separate a single input buffer into frames.  The incoming stream will 
be collected until we have identified that a matching header or footer (or
both) have been successfully identified.

The behaviour of this particular through stream depends on the requested
behaviour:

- for a header-only search, once another matching header is
  identified the through stream will pass that frame on.  In the case
  of the header only search, the EOF file considered to match a new header
  also.

- for a footer-only search, once the footer is identified all queued 
  data is passed on as a frame.

- when both a matching header and footer are required, once we have a match
  at both ends that is passed on as a frame.

### split

```js
split(delimiter)
```

The following is a pretty contrived example, but demonstrates the idea:

```js
var bits = require('pull-tobits');
var pull = require('pull-stream');
var input = new Buffer([1, 2, 3, 4, 5, 6].join('\n'));

console.log(input);
// --> <Buffer 31 0a 32 0a 33 0a 34 0a 35 0a 36>

pull(
  pull.once(input),
  bits.split([0x0A]),  // bits.split('\n') is equivalent
  pull.log()
);

// --> <Buffer 31>
// --> <Buffer 32>
// --> <Buffer 33>
// --> <Buffer 34>
// --> <Buffer 35>
// --> <Buffer 36>
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
