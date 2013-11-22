var parser = require("./parser/src-n-parser");

module.exports = function (value) {
  'use strict';
  /*jslint node: true, regexp: true, indent: 2 */

  function srcNAttribute() {
    return parser.parse(value);
  }

  return srcNAttribute();
};
