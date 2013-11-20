module.exports = function (value, options) {
  'use strict';
  options = options || {};

  function srcNAttribute() {
    return {
      'type': 'src-n-attribute',
      'media-query': mediaQuery(),
      'x-based-urls': xBasedUrls(),
      'viewport-urls': viewportUrls()
    };
  }

  function mediaQuery() {
    var re = /^\s*(\(.*\))\s*(.*)/i,
        m = value.match(re);

    if (!m) {
      return null;
    }

    value = m[2];
    return m[1];
  }

  function xBasedUrls() {
    var m, urls = [],
        single = /\s*((?:\w+\.)+\w+)(?:\s+((?:\d*\.)?\d+x))?\s*/,
        re = new RegExp('^' + single.source + '(,' + single.source + ')*');

    if (!value.match(re)) {
      return null;
    }

    value.split(',').forEach(function(url) {
      m = url.match(single);
      url = {
        'url': m[1]
      };
      if (m[2]) {
        url.resolution = m[2];
      }
      urls.push(url);
    });
    value = '';
    return urls;
  }

  function viewportUrls() {
    var m, list = [],
        urls = [],
        imageSizeRe = /\s*((?:\d*\.)?\d+(?:[a-z]{2,4}|%))\s*/i,
        viewportSizeRe = /\s*\(\s*((?:\d*\.)?\d+[a-z]{2,4})\s*\)\s*/i,
        sizeBasedUrlRe = /\s*((?:\w+\.)+\w+)\s+(\d+)\s*/,
        re = new RegExp('^' + imageSizeRe.source + '(?:' + viewportSizeRe.source + imageSizeRe.source +')*;' + sizeBasedUrlRe.source + '(?:,' + sizeBasedUrlRe.source + ')*', 'i');

    re = /\d([a-z]{2,4})|%[^;]*;[^;]*/i;

    if (!value.match(re)) {
      return null;
    }

    value = value.split(';');

    value[0].split(/\(|\)/).forEach(function(url) {
      list.push(url);
    });

    value[1].split(',').forEach(function(url) {
      m = url.match(sizeBasedUrlRe);
      url = {
        'url': m[1]
      };
      if (m[2]) {
        url.size = m[2];
      }
      urls.push(url);
    });


    return {
      "size-viewport-list": list,
      "size-based-urls": urls
    };
  }


  return srcNAttribute();
};
