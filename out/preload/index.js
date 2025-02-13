"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  getMembers: () => electron.ipcRenderer.invoke("getMembers"),
  createMember: (member) => electron.ipcRenderer.invoke("createMember", member),
  updateMember: (member) => electron.ipcRenderer.invoke("updateMember", member)
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
