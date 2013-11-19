module.exports = function (value, options) {
    'use strict';
    options = options || {};

    function srcNAttribute() {
        return {
            type: 'src-n-attribute'
        };
    }

    return srcNAttribute();
};
