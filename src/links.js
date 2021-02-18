/*jshint esversion: 8 */

import { skyid, pubkey }
	   from './account.js';
import { editor, docLabel, persistentDocKey, myPastes, updateMyPastes, select }
       from './editor.js';
import { encryptData }
       from './encryption.js';
import { showCopyBar }
       from './interface.js';
import { shorten, generateDocKey, generateUuid, getPubkeyBasedRetrievalString }
       from './utility.js';

const generateLink = (mode) => {
  let docKey;
  let retrievalString;
  if (mode === 'mypastes') {
    docKey = persistentDocKey || generateDocKey();
    persistentDocKey = docKey;
  } else {
    docKey = generateDocKey();
  }

  const data = editor.getValue();
  const encryptedData = encryptData(data, docKey);
  showCopyBar('Uploading...');
  var blob = new Blob(
    [encryptedData], {
      type: "text/plain",
      encoding: "utf-8"
    }
  );
  var formData = new FormData();
  formData.append("file", blob);
  const uuid = generateUuid();
  fetch(`/skynet/skyfile/${uuid}?filename=paste.txt`, {
      method: "POST",
      body: formData,
    })
    .then((response) => response.json())
    .then((result) => {
      if (mode !== 'mypastes') retrievalString = result.skylink;
      else retrievalString = getPubkeyBasedRetrievalString(pubkey);
      var url = buildUrl(retrievalString, mode, docKey);
      if (mode === 'mypastes') {
        postFileToRegistry(result.skylink, docKey, url);
        var docID = retrievalString + docKey;
        var docFound = false;
        for (let i = 0; i < myPastes.documents.length; i++) {
          if (myPastes.documents[i].docID == docID) {
            docLabel = myPastes.documents[i].label;
            docFound = true;
          }
        };
        docLabel = docLabel || prompt("Add a label to this document. Only you can see this label.");
        if (!docFound) {
          updateMyPastes(docID);
        }
      } else {
        window.location = url.url;
        showCopyBar(url.content);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const buildUrl = (retrievalString, mode, docKey) => {
  const base =
    `${location.protocol}//${location.host}${location.pathname}`;
  const lang = shorten("Plain Text") === select.selected() ? "" :
    `.${encodeURIComponent(select.selected())}`;
  const url = base + "#" + retrievalString + docKey + lang;
  if (mode === "iframe") {
    const height = editor.doc.height + 45;
    let content =
      `<iframe width="100%" height="${height}" frameborder="0" src="${url}"></iframe>`;
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

export const generateEmbed = () => generateLink('iframe');

export const generateSnapshotUrl = () => generateLink('url');

export const generatePersistentUrl = () => generateLink('mypastes');

async function postFileToRegistry(skylink, docKey, url) {
  skyid.setRegistry(`hackerpaste:file:${docKey}`, skylink, (success) => {
    if (success !== false) {
      window.location = url.url;
      showCopyBar(url.content);
      skyid.hideOverlay(skyid.opts);
    }
  });
}
