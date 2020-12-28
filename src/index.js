import blake        from 'blakejs';
import MicroModal   from 'micromodal';
import marked       from 'marked';
import ClipboardJS  from 'clipboard';
import SlimSelect   from 'slim-select';
import CryptoJS     from 'crypto-js';
import randomString from './randomString.js';
import CodeMirror   from 'codemirror';
import 'codemirror/addon/mode/loadmode';
import 'codemirror/addon/mode/overlay';
import 'codemirror/addon/mode/multiplex';
import 'codemirror/addon/mode/simple';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/mode/meta';
import 'codemirror/mode/apl/apl';
import 'codemirror/mode/asciiarmor/asciiarmor';
import 'codemirror/mode/asn.1/asn.1';
import 'codemirror/mode/asterisk/asterisk';
import 'codemirror/mode/brainfuck/brainfuck';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/clojure/clojure';
import 'codemirror/mode/cmake/cmake';
import 'codemirror/mode/cobol/cobol';
import 'codemirror/mode/coffeescript/coffeescript';
import 'codemirror/mode/commonlisp/commonlisp';
import 'codemirror/mode/crystal/crystal';
import 'codemirror/mode/css/css';
import 'codemirror/mode/cypher/cypher';
import 'codemirror/mode/d/d';
import 'codemirror/mode/dart/dart';
import 'codemirror/mode/diff/diff';
import 'codemirror/mode/django/django';
import 'codemirror/mode/dockerfile/dockerfile';
import 'codemirror/mode/dtd/dtd';
import 'codemirror/mode/dylan/dylan';
import 'codemirror/mode/ebnf/ebnf';
import 'codemirror/mode/ecl/ecl';
import 'codemirror/mode/eiffel/eiffel';
import 'codemirror/mode/elm/elm';
import 'codemirror/mode/erlang/erlang';
import 'codemirror/mode/factor/factor';
import 'codemirror/mode/fcl/fcl';
import 'codemirror/mode/forth/forth';
import 'codemirror/mode/fortran/fortran';
import 'codemirror/mode/gas/gas';
import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/gherkin/gherkin';
import 'codemirror/mode/go/go';
import 'codemirror/mode/groovy/groovy';
import 'codemirror/mode/haml/haml';
import 'codemirror/mode/handlebars/handlebars';
import 'codemirror/mode/haskell/haskell';
import 'codemirror/mode/haskell-literate/haskell-literate';
import 'codemirror/mode/haxe/haxe';
import 'codemirror/mode/htmlembedded/htmlembedded';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/http/http';
import 'codemirror/mode/idl/idl';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jinja2/jinja2';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/julia/julia';
import 'codemirror/mode/livescript/livescript';
import 'codemirror/mode/lua/lua';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/mathematica/mathematica';
import 'codemirror/mode/mbox/mbox';
import 'codemirror/mode/mirc/mirc';
import 'codemirror/mode/mllike/mllike';
import 'codemirror/mode/modelica/modelica';
import 'codemirror/mode/mscgen/mscgen';
import 'codemirror/mode/mumps/mumps';
import 'codemirror/mode/nginx/nginx';
import 'codemirror/mode/nsis/nsis';
import 'codemirror/mode/ntriples/ntriples';
import 'codemirror/mode/octave/octave';
import 'codemirror/mode/oz/oz';
import 'codemirror/mode/pascal/pascal';
import 'codemirror/mode/pegjs/pegjs';
import 'codemirror/mode/perl/perl';
import 'codemirror/mode/php/php';
import 'codemirror/mode/pig/pig';
import 'codemirror/mode/powershell/powershell';
import 'codemirror/mode/properties/properties';
import 'codemirror/mode/protobuf/protobuf';
import 'codemirror/mode/pug/pug';
import 'codemirror/mode/puppet/puppet';
import 'codemirror/mode/python/python';
import 'codemirror/mode/q/q';
import 'codemirror/mode/r/r';
import 'codemirror/mode/rpm/rpm';
import 'codemirror/mode/rst/rst';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/sas/sas';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/scheme/scheme';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/sieve/sieve';
import 'codemirror/mode/slim/slim';
import 'codemirror/mode/smalltalk/smalltalk';
import 'codemirror/mode/smarty/smarty';
import 'codemirror/mode/solr/solr';
import 'codemirror/mode/soy/soy';
import 'codemirror/mode/sparql/sparql';
import 'codemirror/mode/spreadsheet/spreadsheet';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/stex/stex';
import 'codemirror/mode/stylus/stylus';
import 'codemirror/mode/swift/swift';
import 'codemirror/mode/tcl/tcl';
import 'codemirror/mode/textile/textile';
import 'codemirror/mode/tiddlywiki/tiddlywiki';
import 'codemirror/mode/tiki/tiki';
import 'codemirror/mode/toml/toml';
import 'codemirror/mode/tornado/tornado';
import 'codemirror/mode/troff/troff';
import 'codemirror/mode/ttcn/ttcn';
import 'codemirror/mode/ttcn-cfg/ttcn-cfg';
import 'codemirror/mode/turtle/turtle';
import 'codemirror/mode/twig/twig';
import 'codemirror/mode/vb/vb';
import 'codemirror/mode/vbscript/vbscript';
import 'codemirror/mode/velocity/velocity';
import 'codemirror/mode/verilog/verilog';
import 'codemirror/mode/vhdl/vhdl';
import 'codemirror/mode/vue/vue';
import 'codemirror/mode/wast/wast';
import 'codemirror/mode/webidl/webidl';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/xquery/xquery';
import 'codemirror/mode/yacas/yacas';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/yaml-frontmatter/yaml-frontmatter';
import 'codemirror/mode/z80/z80';

(function() {

  let editor = null;
  let select = null;
  let clipboard = null;
  let statsEl = null;
  let persistentSecretKey = null;

  const byId = (id) => document.getElementById(id);

  const byClass = (id) => document.getElementsByClassName(id)[0];

  const switchToLoggedIn = (message) => {
    if (message == "login_success") {
      byId("button-log-in").style.display = "none";
      byId("button-log-out").style.display = "inline-block";
      byId("button-username").style.display = "inline-block";
      //byId("save-to-my-pastes-button").style.display = "inline-block";
      var username;
      byId("modal-content").innerHTML =
        "<p>Setting up your Hacker Paste account...</p>";
      MicroModal.show('app-modal');
      skyid.getRegistry('hackerpaste:username', (response) => {
        if (response.entry === null) {
          username = prompt("What should we call you?");
          skyid.setRegistry('hackerpaste:username', username, () =>
            location.reload());
        } else {
          username = response.entry.data;
          MicroModal.close('app-modal');
        }
        byId("username").textContent = username;
      });
    };
  };

  var skyid = new SkyID('Hacker Paste', switchToLoggedIn, {
    devMode: false
  });

  if (skyid.seed != "") switchToLoggedIn("login_success");

  const switchToLoggedOut = () => {
    skyid.sessionDestroy();
    byId("button-log-in").style.display = "inline-block";
    byId("button-log-out").style.display = "none";
    byId("button-username").style.display = "none";
    //byId("save-to-my-pastes-button").style.display = "none";
  };

  const init = () => {
    initCodeEditor();
    initLangSelector();
    initCode();
    initClipboard();
    initModals();
  };

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

  const initCodeEditor = () => {
    persistentSecretKey = null;
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
        data: {
          mime: e.mime,
          mode: e.mode
        },
      })),
      showContent: "down",
      onChange: (e) => {
        const language = e.data || {
          mime: null,
          mode: null
        };
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

  const gameRoom =
    "AAAuytkzAUZHtJfNKENEj4A9HAvne4fGaKBLONkWGQ01vgvn6zv0Zd2HQGT89wuAy1";

  const decryptData = (data, secretKey) =>
    CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data, secretKey));

  // https://gist.github.com/GeorgioWan/16a7ad2a255e8d5c7ed1aca3ab4aacec
  const hexToBase64 = (str) => {
    return btoa(String.fromCharCode.apply(null,
      str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
      .replace(/ +$/, "").split(" "))).replace('+', '-').replace('/', '_');
  };

  // https://gist.github.com/GeorgioWan/16a7ad2a255e8d5c7ed1aca3ab4aacec
  const base64ToHex = (str) => {
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

  const backToEditor = () => {
    byId("editor").innerHTML = "";
    initCodeEditor();
  };

  const loadView = (viewContent) => {
    editor.setOption('readOnly', true);
    byClass("CodeMirror-cursors").setAttribute("style", "display:none;");
    byClass("CodeMirror-code").innerHTML =
      "<div style='font-size:110%; margin:0;'>" + viewContent + "</div>";
  };

  const loadMyPastes = () => {
    loadView('Soon, you will be able to view a list of your saved pastes.');
  };

  async function postFileToRegistry(skylink, secretKey, url) {
    var pubkey = skyid.userId;
    skyid.setRegistry(`hackerpaste:file:${secretKey}`, skylink, (success) => {
      if (success !== false) {
        window.location = url.url;
        showCopyBar(url.content);
        skyid.hideOverlay(skyid.opts);
      }
    });
  };

  const loadSkylink = (skylink, secretKey) => {
    fetch(`/${skylink}`)
      .then((response) => response.text())
      .then((data) => {
        if (secretKey) data = decryptData(data, secretKey);
        if (skylink === gameRoom.substr(0, 46)) {
          loadView(marked(data));
        } else editor.setValue(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const loadByDocID = (docID) => {
    // A `docID` is a document's retrieval string plus its decryption string.
    // A file suffix for syntax highlighting does not count as part of the docID.
    // Different varieties of docID can be distinguished by their lengths:
    //
    //   *  46 characters: unencrypted, immutable files identified by skylink (as
    //      produced by very early versions of Hacker Paste). Hacker Paste will
    //      open all valid skylinks that are text-based files.
    //   *  64 characters: encrypted, mutable SkyDB files. The skylink representing
    //      the latest version is posted to the SkyDB entry, with the user's public
    //      key, a 64-character hex string, padded with '00' at the end and
    //      re-encoded as a 44-character base64 string. The following 20 characters
    //      are used to decrypt the file. These are "my pastes" links.
    //   *  66 characters: encrypted, immutable skyfiles. The first 46 characters
    //      identifies the skyfile while the remaining 20 characters decrypt the
    //      file. These are "snapshot" links.

    var skylink;
    var secretKey;
    var pubkey;

    persistentSecretKey = null;

    if (docID === "A".repeat(66)) docID = gameRoom;

    if (docID.length === 46) loadSkylink(docID);
    else if (docID.length === 66) {
      secretKey = docID.substr(46);
      skylink = docID.substr(0, 46);
      loadSkylink(skylink, secretKey);
    } else if (docID.length == 64) {
      secretKey = docID.substr(44);
      persistentSecretKey = secretKey;
      pubkey = base64ToHex(docID.substr(0, 44)).substr(0, 64);
      skyid.skynetClient.registry.getEntry(pubkey, `hackerpaste:file:${secretKey}`)
        .then((result) => {
          console.log(result);
          skylink = result.entry.data;
          loadSkylink(skylink, secretKey);
        })
        .catch((error) => {
          console.error(error)
        });
    } else alert('This is not a valid paste link.');
  }

  const generateLink = (mode) => {
    let secretKey;
    if (mode === 'mypastes') {
      secretKey = persistentSecretKey || randomString.url(20);
      persistentSecretKey = secretKey;
    } else {
      secretKey = randomString.url(20);
    }

    const data = editor.getValue();
    const encryptedData = CryptoJS.AES.encrypt(data, secretKey);
    showCopyBar('Uploading...');
    var blob = new Blob(
      [encryptedData], {
        type: "text/plain",
        encoding: "utf-8"
      }
    );
    var formData = new FormData();
    formData.append("file", blob);
    const uuid = randomString.alphanumeric(16);
    fetch(`/skynet/skyfile/${uuid}?filename=paste.txt`, {
        method: "POST",
        body: formData,
      })
      .then((response) => response.json())
      .then((result) => {
        if (mode !== 'mypastes') var retrievalString = result.skylink;
        else retrievalString = hexToBase64(skyid.userId + '00');
        var url = buildUrl(retrievalString, mode, secretKey);
        if (mode === 'mypastes') postFileToRegistry(result.skylink,
          secretKey, url);
        else {
          window.location = url.url;
          showCopyBar(url.content);
        };
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const buildUrl = (retrievalString, mode, secretKey) => {
    const base =
      `${location.protocol}//${location.host}${location.pathname}`;
    const lang = shorten("Plain Text") === select.selected() ? "" :
      `.${encodeURIComponent(select.selected())}`;
    const url = base + "#" + retrievalString + secretKey + lang;
    if (mode === "iframe") {
      const height = editor.doc.height + 45;
      let content =
        `<iframe width="100%" height="${height}" frameborder="0" src="${url}"></iframe>`
      return {
        url: url,
        content: content
      };
    }
    return {
      url: url,
      content: url
    };
  };

  const generateEmbed = () => generateLink('iframe');

  const generateSnapshotUrl = () => generateLink('url');

  const generatePersistentUrl = () => generateLink('mypastes');

  const loadGameRoom = () => loadByDocID(gameRoom);

  const hideCopyBarNow = () => hideCopyBar(false);

  const startSkyIDSession = () => skyid.sessionStart();

  const clickListener = (element_id, func) =>
    byId(element_id).addEventListener("click", func);

  clickListener("copy-close-button", hideCopyBarNow);
  clickListener("wordmark", backToEditor);
  clickListener("releasenumber", loadGameRoom);
  clickListener("button-log-in", startSkyIDSession);
  clickListener("button-log-out", switchToLoggedOut);
  clickListener("enable-line-wrapping", enableLineWrapping);
  clickListener("disable-line-wrapping", disableLineWrapping);
  clickListener("embed-button", generateEmbed);
  clickListener("save-snapshot-button", generateSnapshotUrl);
  //clickListener("save-to-my-pastes-button", generatePersistentUrl);
  clickListener("button-username", loadMyPastes);

  init();

}());
