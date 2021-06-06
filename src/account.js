/*jshint esversion: 8 */

import MicroModal from 'micromodal';
import { loadMyPastes, myPastes }
       from './editor.js';
import { encryptObject, decryptJSONToObject }
       from './encryption.js';
import { byId, clickListener, deleteClickListener }
       from './interface.js';
import { generateDocKey, getPubkeyBasedRetrievalString }
       from './utility.js';

export var username;
export var pubkey;

const switchToLoggedIn = (message) => {
  if (message == "login_success") {
    byId("button-log-out").style.display = "inline-block";
    byId("save-to-my-pastes-button").style.display = "inline-block";
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
        skyid.getProfile((response2) => {
          response2 = JSON.parse(response2);
          pubkey = response2.dapps["Hacker Paste"].publicKey;
          byId("username").textContent = username;
          byId("button-username").setAttribute('aria-label', 'View My Pastes');
          byId("button-username").setAttribute('data-microtip-size', 'fit');
          skyid.getJSON('hackerpaste:my-pastes', (response3) => {
            if (response3 !== "") {
              myPastes = decryptJSONToObject(response3, skyid.seed);
              deleteClickListener("button-username", startSkyIDSession);
              clickListener("button-username", loadMyPastes);
              MicroModal.close('app-modal');
            } else {
              let noteToSelf = getPubkeyBasedRetrievalString(
                pubkey) + generateDocKey();
              let defaultContent =
                {documents:[{label:"Note to Self",docID:noteToSelf}]};
              defaultContent = encryptObject(defaultContent, skyid.seed);
              skyid.setJSON('hackerpaste:my-pastes',
                defaultContent, () => location.reload());
            }
          });
        });
      }
    });
  }
};

export var skyid = new SkyID('Hacker Paste', switchToLoggedIn, {
  devMode: false
});

if (skyid.seed != "") switchToLoggedIn("login_success");

export const startSkyIDSession = () => skyid.sessionStart();

export const switchToLoggedOut = () => {
  skyid.sessionDestroy();
  byId("username").textContent = "Sign in with SkyID";
  clickListener("button-username", startSkyIDSession);
  deleteClickListener("button-username", loadMyPastes);
  byId("button-log-out").style.display = "none";
  byId("save-to-my-pastes-button").style.display = "none";
  byId("button-username").setAttribute('aria-label',
    'Sign in to keep your own private paste list. Registration is completely anonymous.');
  byId("button-username").setAttribute('data-microtip-size', 'medium');
};
