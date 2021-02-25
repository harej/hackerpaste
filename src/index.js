/*jshint esversion: 8 */

import { initCodeEditor, initLangSelector, initCode, initListeners,
         initKeyboardShortcuts }
         from './editor.js';
import { initModals, initClipboard }
         from './interface.js';

import './core.css';

initCodeEditor();
initLangSelector();
initCode();
initClipboard();
initModals();
initKeyboardShortcuts();
initListeners();
