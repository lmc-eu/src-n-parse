var srcnparser = require('..'),
    fs = require('fs'),
    path = require('path'),
    read = fs.readFileSync;

describe('parse(srt)', function(){
  [
    {
        'name': 'x-based',
        'value': '(max-width: 800px) pic2.png .5x, pic3.png 1x, http://www.example.com/pic.js?id=4&format=png 2x'
    },
    {
        'name': 'viewport',
        'value': '100% (40em) 50%; pic.jpg 1200'
    },
    {
        'name': 'viewport-complex',
        'value': '100% (30em) 50% (50em) calc(33% - 100px); pic100.png 100, pic200.png 200, pic400.png 400, pic800.png 800, pic1600.png 1600, pic3200.png 3200'
    }


  ].forEach(function(test){
    it('should parse ' + test.name, function(){
      var json = read(path.join('test', 'expected', test.name + '.json'), 'utf8');
      var ret = srcnparser.parse(test.value);
      ret = JSON.stringify(ret, null, 2);
      ret.should.equal(json.replace(/\r/gm, '').trim());
    })
  });
})

