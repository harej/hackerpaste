/*jshint esversion: 8 */

import ClipboardJS from 'clipboard';

import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'microtip/microtip.css';

export var clipboard;

export const byId = (id) => document.getElementById(id);

export const byClass = (id) => document.getElementsByClassName(id)[0];

export const initModals = () => {
  MicroModal.init({
    onClose: () => editor.focus(),
  });
};

export const initClipboard = () => {
  clipboard = new ClipboardJS(".clipboard");
  clipboard.on("success", () => {
    hideCopyBar(true);
  });
};

export const clickListener = (element_id, func) =>
  byId(element_id).addEventListener("click", func);

export const deleteClickListener = (element_id, func) =>
  byId(element_id).removeEventListener("click", func);

// Open the "Copy" bar and select the content
export const showCopyBar = (dataToCopy) => {
  byId("copy").classList.remove("hidden");
  const linkInput = byId("copy-link");
  linkInput.value = dataToCopy;
  linkInput.focus();
  linkInput.setSelectionRange(0, dataToCopy.length);
};

// Close the "Copy" bar
export const hideCopyBar = (success) => {
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

export const hideCopyBarNow = () => hideCopyBar(false);
