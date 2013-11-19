module.exports = function(value, options) {
    options = options || {};

    function srcNAttribute () {
        return {
            type: 'src-n-attribute'
        };
    }

    return srcNAttribute();
};
