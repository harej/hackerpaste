/*jshint esversion: 8 */

import { startSkyIDSession, switchToLoggedOut }
       from './account.js';
import { init, disableLineWrapping, enableLineWrapping, loadGameRoom }
       from './editor.js';
import { hideCopyBarNow, backToEditor, clickListener }
       from './interface.js';
import { generateEmbed, generateSnapshotUrl, generatePersistentUrl }
       from './links.js';

import './core.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'microtip/microtip.css';
import 'slim-select/dist/slimselect.min.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/theme/dracula.css';

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
