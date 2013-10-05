/* jshint node: true */
'use strict';

var pull = require('pull-core');

/**
  # pull-tobits

  This is a suite of [pull-stream](https://github.com/dominictarr/pull-stream)
  throughs that are used to manipulate an incoming buffer into component
  parts. In a very simple case it could be used to split a file on 
  newline characters (`\n`).  In a more complicated case it could be used
  to identify separate chunks in a [bzip2](http://en.wikipedia.org/wiki/Bzip2)
  compressed file.

  ## Reference
**/


/**
  ### split

  ```js
  split(delimiter)
  ```
  
  The following is a pretty contrived example, but demonstrates the idea:

  <<< examples/split.js
**/
exports.split = pull.Through(function(read, delimiter) {
  var queued = new Buffer(0);

  // if we have been provided a string delimiter, convert to a buffer
  if (typeof delimiter == 'string' || (delimiter instanceof String)) {
    delimiter = new Buffer(delimiter);
  }

  function checkMatch(q, index) {
    var match = true;

    for (var ii = delimiter.length; match && ii--; ) {
      match = q[index + ii] === delimiter[ii]
    }

    return match;
  }

  function nextChunk(cb) {
    var foundChunk = false;

    // create a proxy callback to monitor sending data through to the sink
    function sendChunk(end, data) {
      foundChunk = true;
      cb(end, data);

      // no longer need the monitor, so remap
      sendChunk = cb;
    }

    function next(end, data) {
      if (end) {
        // if we have data queued and end is not an error, then pass
        // the remaining along
        if (queued && queued.length > 0 && (! (end instanceof Error))) {
          cb(false, queued);
          queued = null;
        }

        return cb(end);
      }

      // update queued after splitting
      queued = splitAtChunks(
        Buffer.concat([queued, data], queued.length + data.length),
        sendChunk
      );

      // if we didn't find a delimiter, go again with a read
      if (! foundChunk) {
        read(null, next);
      }
    }

    // read the next chunk
    read(null, next);
  }

  function splitAtChunks(q, cb) {
    // iterate through the data looking for a match
    for (var ii = 0, count = q.length; ii < count; ii++) {
      if (q[ii] === delimiter[0] && (delimiter.length === 1 || checkMatch(q, ii))) {
        // send the data to the callback
        cb(null, q.slice(0, ii));

        // update queued to the delimiter after the delimiter
        return splitAtChunks(q.slice(ii + delimiter.length), cb);
      }
    }

    return q;
  }

  return function(end, cb) {
    if (end) {
      return read(end, cb);
    }

    nextChunk(cb);
  };
});