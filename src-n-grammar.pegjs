start
  = attr:attr { return attr; }

attr
  = media:media? S* urlset:urlset {
    return {
     type: "src-n-attribute",
     "media-query": media ? media : null,
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

xurlset
  = head:xurl tail:("," S* xurl)* {
    var result = [head];
    for (var i = 0; i < tail.length; i++) {
    result.push(tail[i][2]);
    }
    return {
    type: "x-based-urls",
    urls: result
    };
  }

xurl
  = url:url resolution:(S+ RESOLUTION)? {
    return {
      url: url,
      resolution: resolution[1] ? resolution[1] : ""
    }
  }

vurlset
  = vplist:viewportlist S* ";" S* sizeurls:sizeurls {
  return {
    type: "viewport-urls",
    "size-viewport-list": vplist,
    "size-based-urls": sizeurls
  }

}

viewportlist
  = head:imagesize tail:(S* "(" DIMENSION ")" S* (imagesize / CALC ))* {
    var result = [{
      "image-size": head
    }];
    var last = 0;
    for (var i = 0; i < tail.length; i++) {
      result[last]["viewport-size"] = tail[i][2];
      result.push({
        "image-size": tail[i][5]
      });
      last++;
    }
    return result;
  }

imagesize
  = size:(PERCENTAGE / DIMENSION) {
    return size;
  }

sizeurls
  = head:sizeurl tail:("," S* sizeurl)* {
    var result = [head];
    for (var i = 0; i < tail.length; i++) {
      result.push(tail[i][2]);
    }
    return result;
  }

sizeurl
  = url:url S* size:integer {
    return {
      url: url,
      size: size
    }
  }

url
  = value:[A-Za-z0-9\-\./:_%#~?&=]+ { return value.join(""); }

ident
  = value:[A-Za-z0-9\-]+ { return value.join(""); }

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
  = ident:ident { return ident; }

DIMENSION "dimension"
  = num:NUMBER unit:IDENT {
    return {
      unit: unit,
      value: num
    }
  }

NUMBER "number"
  = num:num { return num; }

PERCENTAGE "percentage"
  = parts:(NUMBER "%") {
    return {
      unit: parts[1],
      value: parts[0]
    }
  }

RESOLUTION "resolution"
  = num:NUMBER resolution:RESOLUTION_UNIT {
    return {
      unit: resolution,
      value: num
    }
  }

RESOLUTION_UNIT "resolution unit"
  = (D P I / D P C M / D P P X / X)

CALC "calc expression"
 = C A L C "(" expr:EXPR ")" {
   return {
     type: "calc-expression",
     expression: expr
   }
 }

EXPR
 = S* parts:([^)]+) S* { return parts.join(""); }

OPERATOR
 = [+\-*/]

S "whitespace"
  = s

A = [Aa]
C = [Cc]
D = [Dd]
I = [Ii]
L = [Ll]
M = [Mm]
P = [Pp]
X = [Xx]
