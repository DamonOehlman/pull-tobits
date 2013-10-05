/* jshint node: true */
'use strict';

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

exports.split = require('./split');
exports.frame = require('./frame');