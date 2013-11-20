var parse = require('..'),
    fs = require('fs'),
    path = require('path'),
    read = fs.readFileSync;

describe('parse(srt)', function(){
  [
    {
        'name': 'x-based',
        'value': '(max-width: 400px) pic.jpg 1x'
    },
    {
        'name': 'viewport',
        'value': '100% (40em) 50%; pic.jpg 1200'
    }

  ].forEach(function(test){
    it('should parse ' + test.name, function(){
      var json = read(path.join('test', 'expected', test.name + '.json'), 'utf8');
      var ret = parse(test.value);
      ret = JSON.stringify(ret, null, 2);
      fs.writeFileSync(path.join('test', 'out', test.name + '.json'), ret);
      ret.should.equal(json);
    })
  });
})

