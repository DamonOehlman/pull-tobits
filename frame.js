/* jshint node: true */
'use strict';

var pull = require('pull-core');

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

});