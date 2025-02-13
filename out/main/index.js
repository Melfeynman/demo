"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const pg = require("pg");
const icon = path.join(__dirname, "../../resources/Лого.png");
const connectDB = async () => {
  const client = new pg.Client({
    user: "alena",
    password: "alena",
    host: "127.0.0.1",
    port: "5432",
    database: "demo_js"
  });
  await client.connect();
  return client;
};
async function getMembers() {
  try {
    return null;
  } catch (e) {
    console.log(e);
  }
}
async function createMember(event, member) {
  const { ceo, age, post, organization, salary } = member;
  try {
    await global.dbclient.query(`INSERT into members (ceo, age, post, organization, salary) values('${ceo}', '${age}', '${post}', '${organization}', '${salary}')`);
    electron.dialog.showMessageBox({ message: "Успех! Member создан" });
  } catch (e) {
    console.log(e);
    electron.dialog.showErrorBox("Ошибка", "Member с таким именем уже есть");
  }
}
async function updateMember(event, member) {
  const { ceo, age, post, organization, salary } = member;
  try {
    await global.dbclient.query(`UPDATE members
      SET ceo='${ceo}', age='${age}', post='${post}', organization='${organization}', salary='${salary}'
      WHERE members.id = ${id};`);
    electron.dialog.showMessageBox({ message: "Успех! Данные обновлены" });
    return;
  } catch (e) {
    electron.dialog.showErrorBox("Невозможно создать пользователя", "Такой пользователь уже есть");
    return "error";
  }
}
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    icon: path.join(__dirname, "../../resources/icon.ico"),
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(async () => {
  utils.electronApp.setAppUserModelId("com.electron");
  global.dbclient = await connectDB();
  electron.ipcMain.handle("getMembers", getMembers);
  electron.ipcMain.handle("createMember", createMember);
  electron.ipcMain.handle("updateMember", updateMember);
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
