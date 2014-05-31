/* jshint node: true */
'use strict';

var pull = require('pull-core');
var BufferList = require('bl');

/**
  ### split

  ```
  split(delimiter)
  ```

  Split an incoming buffer into separate parts, and throw away the
  delimiters. The following is a pretty contrived example, but demonstrates
  the idea:

  <<< examples/split.js
**/
module.exports = pull.Through(function(read, delimiter) {
  var bl = new BufferList();
  var queued = [];

  // if we have been provided a string delimiter, convert to a buffer
  if (typeof delimiter == 'string' || (delimiter instanceof String)) {
    delimiter = new Buffer(delimiter);
  }

  function checkMatch(q, index) {
    var match = true;

    for (var ii = delimiter.length; match && ii--; ) {
      match = bl.get(index + ii) === delimiter[ii]
    }

    return match;
  }

  function splitAtChunks() {
    var out = [];

    // iterate through the data looking for a match
    for (var ii = 0, count = bl.length; ii < count; ii++) {
      if (bl.get(ii) === delimiter[0] && (delimiter.length === 1 || checkMatch(ii))) {
        out.push(bl.slice(0, ii));
        bl.consume(ii + delimiter.length);

        return out.concat(splitAtChunks());
      }
    }

    return out;
  }

  // no delimiter? do nothing
  if (! delimiter) {
    return read;
  }

  return function(abort, cb) {
    function next(end, data) {
      var last;

      if (end) {
        if (bl.length > 0) {
          last = bl.slice(0);
          bl = new BufferList();

          return cb(null, last);
        }

        return cb(end, data);
      }

      bl.append(data);
      queued = queued.concat(splitAtChunks());

      // if we have queued data return that
      if (queued.length > 0) {
        return cb(null, queued.shift());
      }

      read(null, next);
    }

    if (abort) {
      return cb(abort);
    }

    // if we have queued data, then return a queued chunk
    if (queued.length > 0) {
      return cb(null, queued.shift());
    }

    read(abort, next);
  };
});
