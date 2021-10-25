/*jshint esversion: 8 */

import CodeMirror from 'codemirror';
import SlimSelect from 'slim-select';
import marked from 'marked';

import { skyid, pubkey, startSkyIDSession, switchToLoggedOut }
       from './account.js';
import { decryptData, encryptObject }
       from './encryption.js';
import { byId, byClass, hideCopyBar, hideCopyBarNow, clickListener}
       from './interface.js';
import { buildUrl }
       from './links.js';
import { shorten, base64ToHex }
       from './utility.js';
import { generateEmbed, generateSnapshotUrl, generatePersistentUrl }
       from './links.js';

import 'codemirror/lib/codemirror.css';
import 'slim-select/dist/slimselect.min.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/theme/dracula.css';

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

export var editor;
export var select;
export var myPastes;
export var docLabel;
export var persistentDocKey;
export var statsEl;

export const initCode = () => {
  let payload = location.hash.substr(1);
  if (payload.length === 0) return;
  payload = payload.split(".");
  let docID = payload[0];
  loadByDocID(docID);
};

export const initCodeEditor = () => {
  persistentDocKey = null;
  docLabel = null;
  editor = new CodeMirror(byId("editor"), {
    lineNumbers: true,
    theme: "dracula",
    readOnly: readOnly,
    lineWrapping: true,
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

export const initLangSelector = () => {
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

export const initKeyboardShortcuts = () => {
  // Save snapshot when you press CTRL+S
  document.addEventListener("keydown", (event) => {
    if (event.key === "s" && event.ctrlKey) {
      event.preventDefault();
      generateSnapshotUrl();
    }
  });
};

export const initListeners = () => {
  clickListener("copy-close-button", hideCopyBarNow);
  clickListener("wordmark", backToEditor);
  clickListener("button-username", startSkyIDSession);
  clickListener("button-log-out", switchToLoggedOut);
  clickListener("enable-line-wrapping", enableLineWrapping);
  clickListener("disable-line-wrapping", disableLineWrapping);
  clickListener("embed-button", generateEmbed);
  clickListener("save-snapshot-button", generateSnapshotUrl);
  clickListener("save-to-my-pastes-button", generatePersistentUrl);
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
  var docKey;

  persistentDocKey = null;
  docLabel = null;

  loadSkylink(skylink)
  // if (docID.length === 46) loadSkylink(docID);
  // else if (docID.length === 66) {
  //   docKey = docID.substr(46);
  //   skylink = docID.substr(0, 46);
  //   loadSkylink(skylink, docKey);
  // } else if (docID.length == 64) {
  //   docKey = docID.substr(44);
  //   persistentDocKey = docKey;
  //   let docPubkey = base64ToHex(docID.substr(0, 44)).substr(0, 64);
    skyid.skynetClient.registry.getEntry(docPubkey,
        `hackerpaste:file:${docKey}`)
      .then((result) => {
        skylink = result.entry.data;
        loadSkylink(skylink, docKey);
      })
      .catch((error) => {
        console.error(error);
      });
  // } else alert('This is not a valid paste link.');
};

const loadView = (viewContent) => {
  editor.setOption('readOnly', true);
  byClass("CodeMirror-cursors").setAttribute("style", "display:none;");
  byClass("CodeMirror-code").innerHTML =
    `<div style="font-size:110%; margin:0;">${viewContent}</div>`;
};

async function fetchSkylink(skylink) {
  let content = skyid.skynetClient.getFileContent(skylink);
  return content;
}

const loadSkylink = (skylink, docKey) => {
  skyid.skynetClient.getFileContent(skylink)
    .then((data) => {
      data = data.data; // drop the metadata; get to the good stuff
      let loadAsMarkdown = false;
      // if (docKey) data = decryptData(data, docKey);
      if (loadAsMarkdown) {
        loadView(marked(data));
      } else editor.setValue(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const backToEditor = () => {
  byId("editor").innerHTML = "";
  initCodeEditor();
};

export const loadMyPastes = () => {
  let view = "<ul id='my-pastes-list'>";
  if (typeof myPastes !== "object") myPastes = JSON.parse(myPastes);
  for (let i = 0; i < myPastes.documents.length; i++) {
    let entryURL = buildUrl(myPastes.documents[i].docID, "mypastes", "");
    view +=
      `<li><a href="${entryURL.url}" target="_blank">${myPastes.documents[i].label}</a></li>`;
  };
  view += "</ul><br />";
  view += `<button id="new-paste-button" class="py-1 px-2 mx-0 my-1" type="button">New Paste</button>`;
  loadView(view);
  clickListener("new-paste-button", backToEditor);
};

export async function updateMyPastes(docID, docLabel) {
  myPastes.documents.push({label: docLabel, docID: docID});
  let newPasteList = encryptObject(myPastes, skyid.seed);
  skyid.setJSON('hackerpaste:my-pastes', newPasteList, (response) => {
    if (response !== true) console.error(response);
  })
}

export const disableLineWrapping = () => {
  byId("disable-line-wrapping").classList.add("hidden");
  byId("enable-line-wrapping").classList.remove("hidden");
  editor.setOption("lineWrapping", false);
};

export const enableLineWrapping = () => {
  byId("enable-line-wrapping").classList.add("hidden");
  byId("disable-line-wrapping").classList.remove("hidden");
  editor.setOption("lineWrapping", true);
};
