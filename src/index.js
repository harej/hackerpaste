/*jshint esversion: 8 */

import { startSkyIDSession, switchToLoggedOut } from './account.js';
import { init, disableLineWrapping, enableLineWrapping, loadGameRoom }
       from './editor.js';
import { hideCopyBarNow, backToEditor, clickListener }
       from './interface.js';
import { generateEmbed, generateSnapshotUrl, generatePersistentUrl }
       from './links.js';

init();

clickListener("copy-close-button", hideCopyBarNow);
clickListener("wordmark", backToEditor);
clickListener("releasenumber", loadGameRoom);
clickListener("button-username", startSkyIDSession);
clickListener("button-log-out", switchToLoggedOut);
clickListener("enable-line-wrapping", enableLineWrapping);
clickListener("disable-line-wrapping", disableLineWrapping);
clickListener("embed-button", generateEmbed);
clickListener("save-snapshot-button", generateSnapshotUrl);
clickListener("save-to-my-pastes-button", generatePersistentUrl);
