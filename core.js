/*jshint esversion: 6 */

let editor = null;
let select = null;
let clipboard = null;
let statsEl = null;

const init = () => {
  initCodeEditor();
  initLangSelector();
  initCode();
  initClipboard();
  initModals();
};

const gameRoom = "AACn0GVPLWAoy54ZUA0i3eTSKpa-9rnxgOfyQ8Sm9cmwyg_JCzeH5Lhyx20F_Fn9NB";

const initCodeEditor = () => {
  CodeMirror.modeURL =
    "https://cdn.jsdelivr.net/npm/codemirror@5.58.1/mode/%N/%N.js";
  editor = new CodeMirror(byId("editor"), {
    lineNumbers: true,
    theme: "dracula",
    readOnly: readOnly,
    lineWrapping: false,
    scrollbarStyle: "simple",
  });
  if (readOnly) {
    document.body.classList.add("readonly");
  }
  statsEl = byId("stats");
  editor.on("change", () => {
    statsEl.innerHTML = `Length: ${editor.getValue().length} |  Lines: ${
      editor.doc.size
    }`;
    hideCopyBar();
  });
};

const initLangSelector = () => {
  select = new SlimSelect({
    select: "#language",
    data: CodeMirror.modeInfo.map((e) => ({
      text: e.name,
      value: shorten(e.name),
      data: { mime: e.mime, mode: e.mode },
    })),
    showContent: "down",
    onChange: (e) => {
      const language = e.data || { mime: null, mode: null };
      editor.setOption("mode", language.mime);
      CodeMirror.autoLoadMode(editor, language.mode);
      document.title =
        e.text && e.text !== "Plain Text" ?
        `Hacker Paste - ${e.text} code snippet` :
        "Hacker Paste";
    },
  });

  // Set lang selector
  const l = location.hash.substr(1).split(".")[1] ||
            new URLSearchParams(window.location.search).get("l");
  select.set(l ? decodeURIComponent(l) : shorten("Plain Text"));
};

const decryptData = (data, secretKey) =>
  CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data, secretKey));

const loadByDocID = (docID) => {
  var skylink;
  if (docID === "A".repeat(66)) docID = gameRoom;
  if (docID.length === 66) {
    var secretKey = docID.substr(46);
    skylink = docID.substr(0,46);
  } else skylink = docID;
  fetch(`/${skylink}`)
    .then((response) => response.text())
    .then(function (data) {
      if (secretKey) data = decryptData(data, secretKey);
      if (docID === gameRoom ) epicGamerMoment(data);
      editor.setValue(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const initCode = () => {
  let payload = location.hash.substr(1);
  if (payload.length === 0) return;
  payload = payload.split(".");
  var docID = payload[0];
  loadByDocID(docID);
};

const initClipboard = () => {
  clipboard = new ClipboardJS(".clipboard");
  clipboard.on("success", () => {
    hideCopyBar(true);
  });
};

const initModals = () => {
  MicroModal.init({
    onClose: () => editor.focus(),
  });
};

const generateUUID = () => {
  let uuid = "";
  const cs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 16; i++) {
    uuid += cs.charAt(Math.floor(Math.random() * cs.length));
  }
  return uuid;
};

const generateLink = (mode) => {
  const secretKey = randomString.url(20);
  const data = editor.getValue();
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey);
  var blob = new Blob(
    [encryptedData],
    { type: "text/plain", encoding: "utf-8" }
  );
  var formData = new FormData();
  formData.append("file", blob);
  const uuid = generateUUID();
  fetch(`/skynet/skyfile/${uuid}?filename=paste.txt`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      var skylink = result.skylink;
      var url = buildUrl(skylink, mode, secretKey);
      window.location = url;
      showCopyBar(url);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Open the "Copy" bar and select the content
const showCopyBar = (dataToCopy) => {
  byId("copy").classList.remove("hidden");
  const linkInput = byId("copy-link");
  linkInput.value = dataToCopy;
  linkInput.focus();
  linkInput.setSelectionRange(0, dataToCopy.length);
};

// Close the "Copy" bar
const hideCopyBar = (success) => {
  const copyButton = byId("copy-btn");
  const copyBar = byId("copy");
  if (!success) {
    copyBar.classList.add("hidden");
    return;
  }
  copyButton.innerText = "Copied !";
  setTimeout(() => {
    copyBar.classList.add("hidden");
    copyButton.innerText = "Copy";
  }, 800);
};

const disableLineWrapping = () => {
  byId("disable-line-wrapping").classList.add("hidden");
  byId("enable-line-wrapping").classList.remove("hidden");
  editor.setOption("lineWrapping", false);
};

const enableLineWrapping = () => {
  byId("enable-line-wrapping").classList.add("hidden");
  byId("disable-line-wrapping").classList.remove("hidden");
  editor.setOption("lineWrapping", true);
};

const openInNewTab = () => {
  window.open(location.href.replace(/[?&]readonly/, ""));
};

const buildUrl = (skylink, mode, secretKey) => {
  const base = `${location.protocol}//${location.host}${location.pathname}`;
  const lang = shorten("Plain Text") === select.selected() ?
    "" :
    `.${encodeURIComponent(select.selected())}`;
  const url = base + "#" + skylink + secretKey + lang;
  if (mode === "iframe") {
    const height = editor.doc.height + 45;
    return `<iframe
      width="100%"
      height="${height}"
      frameborder="0"
      src="${url}">
      </iframe>`;
  }
  return url;
};

const slugify = (str) =>
  str
    .trim()
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\+/g, "-p")
    .replace(/#/g, "-sharp")
    .replace(/[^\w\-]+/g, "");

const shorten = (name) => {
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

const epicGamerMoment = (data) => {
  if (data === undefined) loadByDocID(gameRoom);
  byId("modal-content").innerHTML = marked(data);
  MicroModal.show('app-modal');
};

const byId = (id) => document.getElementById(id);

init();

// randomString function for secure password generation, minified using UglifyJS
// https://gist.githubusercontent.com/dchest/751fd00ee417c947c252/raw/53c4e953b4748f4a46367fc1bce4aee8cfc4a1cb/randomString.js
// --------------------
var randomString=function(){var r=("undefined"!=typeof self&&(self.crypto||self.msCrypto)?function(){var r=self.crypto||self.msCrypto;return function(e){for(var t=new Uint8Array(e),n=0;n<e;n+=65536)r.getRandomValues(t.subarray(n,n+Math.min(e-n,65536)));return t}}:function(){return require("crypto").randomBytes})(),e=function(e){if(e.length<2)throw new Error("charset must have at least 2 characters");var t=function(n){if(!n)return t.entropy(128);for(var o="",a=e.length,f=256-256%a;n>0;)for(var h=r(Math.ceil(256*n/f)),i=0;i<h.length&&n>0;i++){var u=h[i];u<f&&(o+=e.charAt(u%a),n--)}return o};return t.entropy=function(r){return t(Math.ceil(r/(Math.log(e.length)/Math.LN2)))},t.charset=e,t},t="0123456789",n="abcdefghijklmnopqrstuvwxyz",o={numeric:t,hex:t+"abcdef",alphalower:n,alpha:n+n.toUpperCase(),alphanumeric:t+n+n.toUpperCase(),base64:t+n+n.toUpperCase()+"+/",url:t+n+n.toUpperCase()+"-_"},a=e(o.alphanumeric);for(var f in o)a[f]=e(o[f]);a.custom=e;var h={length:function(r){if(r().length!==r.entropy(128).length)throw new Error("Bad result for zero length");for(var e=1;e<32;e++)if(r(e).length!==e)throw new Error("Length differs: "+e)},chars:function(r){var e=Array.prototype.map.call(r.charset,function(r){return"\\u"+("0000"+r.charCodeAt(0).toString(16)).substr(-4)});if(!new RegExp("^["+e.join("")+"]+$").test(r(256)))throw new Error("Bad chars for "+r.charset)},entropy:function(r){var e=r.entropy(128).length;if(e*(Math.log(r.charset.length)/Math.LN2)<128)throw new Error("Wrong length for entropy: "+e)},uniqueness:function(r,e){for(var t={},n=0;n<(e?10:1e4);n++){var o=r();if(t[o])throw new Error("Repeated result: "+o);t[o]=!0}},bias:function(r,e){if(!e){for(var t="",n={},o=0;o<1e3;o++)t+=r(1e3);for(o=0;o<t.length;o++){var a=t.charAt(o);n[a]=(n[a]||0)+1}var f=t.length/r.charset.length;for(var h in n){var i=n[h]/f;if(i<.95||i>1.05)throw new Error('Biased "'+h+'": average is '+f+", got "+n[h]+" in "+r.charset)}}}};return a.test=function(r){for(var e in h){var t=h[e];for(var n in t(a,r),t(a.custom("abc"),r),o)t(a[n],r)}},"undefined"!=typeof module&&module.exports&&(module.exports=a),a}();
