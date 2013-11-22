start
  = attr:attr { return attr; }

attr
  = media:media? S* urlset:urlset {
    return {
     media: media,
     urls: urlset
    }
  }

media
  = S* "(" S* medium:medium ")" S* {
    return medium;
  }

medium
  = feature:IDENT S* ":" S* dimension:DIMENSION S* {
    return {
      feature: feature,
      dimension: dimension
    }
  }

urlset
  = urlset:(vurlset / xurlset) { return urlset; }

xurlset = head:xurl tail:("," S* xurl)* {
      var result = [head];
      for (var i = 0; i < tail.length; i++) {
        result.push(tail[i][2]);
      }
      return { type: "xurlset", urls: result };
    }

xurl
  = url:url resolution:(S+ RESOLUTION)? {
    return {
      url: url,
      resolution: resolution[1] ? resolution[1] : ""
    }
  }

vurlset = vplist:viewportlist S* ";" S* sizeurls:sizeurls {
  return {
    type: "vurlset",
    viewportlist: vplist,
    sizeurls: sizeurls
  }

}

viewportlist = head:imagesize tail:(S* "(" DIMENSION ")" S* imagesize)* {
      var result = [head];
      for (var i = 0; i < tail.length; i++) {
        result.push(tail[i][2]);
        result.push(tail[i][5]);
      }
      return result;
    }

imagesize
  = size:(PERCENTAGE / DIMENSION) {
    return size;
  }

sizeurls = head:sizeurl tail:("," S* sizeurl)* {
      var result = [head];
      for (var i = 0; i < tail.length; i++) {
        result.push(tail[i][2]);
      }
      return result;
    }

sizeurl = url:url S* size:integer {
    return {
      url: url,
      size: size
    }
  }

url
  = value:[A-Za-z0-9\-\./]+ { return value.join(""); }

ident
  = value:[A-Za-z0-9\-]+ { return value.join(""); }

comment
  = "/*" [^*]* "*"+ ([^/*] [^*]* "*"+)* "/"

num
  = float
  / integer

integer
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

float
  = parts:(integer? "." integer) { return parseFloat(parts.join("")); }

s
  = [ \t\r\n\f]+

IDENT "identifier"
  = comment* ident:ident { return ident; }

DIMENSION "dimension"
  = comment* num:NUMBER unit:IDENT {
    return {
      unit: unit,
      value: num
    }
  }

NUMBER "number"
  = comment* num:num { return num; }

PERCENTAGE "percentage"
  = comment* parts:(NUMBER "%") { return parts.join(""); }

RESOLUTION "resolution"
  = num:NUMBER resolution:RESOLUTION_UNIT {
    return {
      unit: resolution,
      value: num
    }
  }

RESOLUTION_UNIT "resolution unit"
  = (D P I / D P C M / D P P X / X)

S "whitespace"
  = comment* s

C = [Cc]
D = [Dd]
I = [Ii]
M = [Mm]
P = [Pp]
X = [Xx]