/*jshint esversion: 8 */
// import { UserProfileDAC } from "@skynethub/userprofile-library";
import { MySky } from './mysky';
import MicroModal from 'micromodal';
import { loadMyPastes, myPastes }
       from './editor.js';
import { encryptObject, decryptObject }
       from './encryption.js';
import { byId, clickListener, deleteClickListener }
       from './interface.js';
import { generateDocKey, getPubkeyBasedRetrievalString }
       from './utility.js';

export var username;
export var pubkey;

const switchToLoggedIn = (message) => {
  debugger
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
        byId("username").textContent = username;
        byId("button-username").setAttribute('aria-label', 'View My Pastes');
        byId("button-username").setAttribute('data-microtip-size', 'fit');
        skyid.getJSON('hackerpaste:my-pastes', (response3) => {
          if (response3["entry"] !== null) {
            //myPastes = decryptObject(response3, skyid.seed);
            let myPastes = response3["entry"]
            deleteClickListener("button-username", startSkyIDSession);
            clickListener("button-username", loadMyPastes);
            MicroModal.close('app-modal');
          } else {
            let defaultContent = {documents:[{label: "Note to Self", docID:Math.random()*1000}]}
            skyid.setJSON('hackerpaste:my-pastes',
              defaultContent, () => location.reload());
          }
        });
      }
    });
  }
};
export var skyid = new MySky('Hacker Paste', switchToLoggedIn, {
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
