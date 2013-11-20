module.exports = function (value) {
  'use strict';
  /*jslint node: true, regexp: true, indent: 2 */

   /**
   * Trim `str`.
   */

  function trim(str) {
    return str ? str.replace(/^\s+|\s+$/g, '') : '';
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

    value.split(',').forEach(function (url) {
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
    var m, i, len, item, list = [], urls = [],
      sizeBasedUrlRe = /\s*((?:\w+\.)+\w+)\s+(\d+)\s*/,
      re = /\d([a-z]{2,4}|%)[^;]*;(\s*[^\s;]*\s+\d+)+/i;

    if (!value.match(re)) {
      return null;
    }

    value = value.split(';');

    m = value[0].split(/(?: \()|(?:\) )/);
    for (i = 0, len = m.length; i < len; i += 1) {
      m[i] = trim(m[i]);
      if (i % 2 === 0) {
        item = {
          'image-size': m[i]
        };
      } else {
        item['viewport-size'] = m[i];
        list.push(item);
      }
    }
    list.push(item);

    value[1].split(',').forEach(function (url) {
      m = url.match(sizeBasedUrlRe);
      url = {
        'url': m[1]
      };
      if (m[2]) {
        url.size = m[2];
      }
      urls.push(url);
    });


    value = '';
    return {
      "size-viewport-list": list,
      "size-based-urls": urls
    };
  }

  function srcNAttribute() {
    return {
      'type': 'src-n-attribute',
      'media-query': mediaQuery(),
      'x-based-urls': xBasedUrls(),
      'viewport-urls': viewportUrls()
    };
  }

  return srcNAttribute();
};
