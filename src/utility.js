/*jshint esversion: 8 */

const slugify = (str) =>
  str
  .trim()
  .toString()
  .toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/\+/g, "-p")
  .replace(/#/g, "-sharp")
  .replace(/[^\w\-]+/g, "");

// https://gist.github.com/GeorgioWan/16a7ad2a255e8d5c7ed1aca3ab4aacec
const hexToBase64 = (str) => {
  return btoa(String.fromCharCode.apply(null,
    str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
    .replace(/ +$/, "").split(" "))).replace('+', '-').replace('/', '_');
};

// https://gist.github.com/GeorgioWan/16a7ad2a255e8d5c7ed1aca3ab4aacec
export const base64ToHex = (str) => {
  for (var i = 0, bin = atob(str.replace(/[ \r\n]+$/, "").replace('-',
        '+')
      .replace('_', '/')), hex = []; i < bin
    .length; ++i) {
    let tmp = bin.charCodeAt(i).toString(16);
    if (tmp.length === 1) tmp = "0" + tmp;
    hex[hex.length] = tmp;
  }
  return hex.join("");
};

export const shorten = (name) => {
  let n = slugify(name).replace("script", "-s").replace("python", "py");
  const nov = (s) => s[0] + s.substr(1).replace(/[aeiouy-]/g, "");
  if (n.replace(/-/g, "").length <= 4) {
    return n.replace(/-/g, "");
  }
  if (n.split("-").length >= 2) {
    return n
      .split("-")
      .map((x) => nov(x.substr(0, 2)))
      .join("")
      .substr(0, 4);
  }
  n = nov(n);
  if (n.length <= 4) {
    return n;
  }
  return n.substr(0, 2) + n.substr(n.length - 2, 2);
};

export const generateDocKey = () => generateRandomString.url(20);

export const generateUuid = () => generateRandomString.alphanumeric(16);

export const getPubkeyBasedRetrievalString = (pubkey) =>
  hexToBase64(pubkey + '00');

// Source:
// https://gist.githubusercontent.com/dchest/751fd00ee417c947c252/raw/53c4e953b4748f4a46367fc1bce4aee8cfc4a1cb/randomString.js

var generateRandomString = (function() {

  var getRandomBytes = (
    (typeof self !== 'undefined' && (self.crypto || self.msCrypto))
      ? function() { // Browsers
          var crypto = (self.crypto || self.msCrypto), QUOTA = 65536;
          return function(n) {
            var a = new Uint8Array(n);
            for (var i = 0; i < n; i += QUOTA) {
              crypto.getRandomValues(a.subarray(i, i + Math.min(n - i, QUOTA)));
            }
            return a;
          };
        }
      : function() { // Node
          return require("crypto").randomBytes;
        }
  )();

  var makeGenerator = function(charset) {
    if (charset.length < 2) {
      throw new Error('charset must have at least 2 characters');
    }

    var generate = function(length) {
      if (!length) return generate.entropy(128);
      var out = '';
      var charsLen = charset.length;
      var maxByte = 256 - (256 % charsLen);
      while (length > 0) {
        var buf = getRandomBytes(Math.ceil(length * 256 / maxByte));
        for (var i = 0; i < buf.length && length > 0; i++) {
          var randomByte = buf[i];
          if (randomByte < maxByte) {
            out += charset.charAt(randomByte % charsLen);
            length--;
          }
        }
      }
      return out;
    };

    generate.entropy = function(bits) { 
      return generate(Math.ceil(bits / (Math.log(charset.length) / Math.LN2)));
    };

    generate.charset = charset;

    return generate;
  };


  // Charsets

  var numbers = '0123456789', letters = 'abcdefghijklmnopqrstuvwxyz';

  var CHARSETS = {
    numeric: numbers,
    hex: numbers + 'abcdef',
    alphalower: letters,
    alpha: letters + letters.toUpperCase(),
    alphanumeric: numbers + letters + letters.toUpperCase(),
    base64: numbers + letters + letters.toUpperCase() + '+/',
    url: numbers + letters + letters.toUpperCase() + '-_'
  };

  // Functions

  var randomString = makeGenerator(CHARSETS.alphanumeric);

  for (var name in CHARSETS) {
    randomString[name] = makeGenerator(CHARSETS[name]);
  }

  randomString.custom = makeGenerator;

  // Tests

  var TESTS = {
    length: function(fn) {
      if (fn().length !== fn.entropy(128).length) {
        throw new Error('Bad result for zero length');
      }
      for (var i = 1; i < 32; i++) {
        if (fn(i).length !== i) {
          throw new Error('Length differs: ' + i);
        }
      }
    },
    chars: function(fn) {
      var chars = Array.prototype.map.call(fn.charset, function(x) {
        return '\\u' + ('0000' + x.charCodeAt(0).toString(16)).substr(-4);
      });
      var re = new RegExp('^[' + chars.join('') + ']+$');
      if (!re.test(fn(256))) {
        throw new Error('Bad chars for ' + fn.charset);
      }
    },
    entropy: function(fn) {
      var len = fn.entropy(128).length;
      if (len * (Math.log(fn.charset.length) / Math.LN2) < 128) {
        throw new Error('Wrong length for entropy: ' + len);
      }
    },
    uniqueness: function(fn, quick) {
      var uniq = {};
      for (var i = 0; i < (quick ? 10 : 10000); i++) {
        var s = fn();
        if (uniq[s]) {
          throw new Error('Repeated result: ' + s);
        }
        uniq[s] = true;
      }
    },
    bias: function(fn, quick) {
      if (quick) return;
      var s = '', counts = {};
      for (var i = 0; i < 1000; i++) {
        s += fn(1000);
      }
      for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        counts[c] = (counts[c] || 0) + 1;
      }
      var avg = s.length / fn.charset.length;
      for (var k in counts) {
        var diff = counts[k] / avg;
        if (diff < 0.95 || diff > 1.05) {
          throw new Error('Biased "' + k + '": average is ' + avg +
                          ", got " + counts[k] + ' in ' + fn.charset);
        }
      }
    }
  };

  randomString.test = function(quick) {
    for(var test in TESTS) {
      var t = TESTS[test];
      t(randomString, quick);
      t(randomString.custom('abc'), quick);
      for (var cname in CHARSETS) {
        t(randomString[cname], quick);
      }
    }
  };

  return randomString;

}());
