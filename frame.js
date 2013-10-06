/* jshint node: true */
'use strict';

var pull = require('pull-core');
var bl = require('bl');
var bs = require('bitsyntax');

/**
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

**/
module.exports = pull.Through(function(read, opts) {

  var queued = bl();
  var ci = 0;
  var active;
  var header = opts && opts.header ? bs.compile(opts.header) : null;
  var footer = opts && opts.footer ? bs.compile(opts.footer) : null;

  // initialise a header and footer match flag
  var headerMatch = false;
  var footerMatch = false;

  // if we have a header or footer, then calculate the byte lengths
  var headerLen = header && calcByteLen(opts.header);
  var footerLen = footer && calcByteLen(opts.footer);

  function readNext(cb) {

    function next(end, data) {
      // on error, exit immediately
      if (end instanceof Error) {
        return cb(end);
      }
      // on normal end, see if we should pass on queued data
      // which should only happen in the case of a header only search
      else if (end) {
        if (queued.length > 0 && header && (! footer)) {
        }
      }

      // TODO: if the data is not a buffer, complain

      // append the buffer to the queued list
      queued.append(data);
      console.log(queued.length);

      // look across the entirety of the buffer for a match
      if (header && (! headerMatch)) {
        while ((! headerMatch) && ci + headerLen <= queued.length) {
          console.log(queued.slice(ci, ci + headerLen));
          headerMatch = header(queued.slice(ci, ci + headerLen));
          ci += 1;
        } 

        console.log('header match = ', headerMatch);
      }
    }

    read(null, next);
  }

  return function(end, cb) {
    if (end) {
      return read(end, cb);
    }

    readNext(cb);
  }
});


function calcByteLen(expression) {
  return bs.parse(expression).reduce(function(memo, part) {
    return memo + (part.size / 8) | 0;
  }, 0);
}