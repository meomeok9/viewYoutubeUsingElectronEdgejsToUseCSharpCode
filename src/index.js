const { app, BrowserWindow, ipcMain, Menu } = require("electron");
// const { spawn, execFileSync, execFile } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");
let mainPlasform;
if (require("electron-squirrel-startup")) {
  app.quit();
}
let mainWindow;

const createWindow = () => {
  overlayWindow = new BrowserWindow({
    width: 900,
    height: 720,
    focusable: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  overlayWindow.loadFile(path.join(__dirname, "index.html"));
  mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
  overlayWindow.on("exit", () => {
    if (process.platform !== "darwin") {
      app.exit();
    }
  });
  overlayWindow.show();
  overlayWindow.webContents.openDevTools();
  overlayWindow.on("close", () => (overlayWindow = null));
};

ipcMain.on("device:load", (devices) => {
  devices.forEach((device, i) => {
    console.log(`${i} `, device.id);
  });
});

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: mainPlasform === "darwin" ? "Command+Q" : "ctrl+q",
        click() {
          app.quit();
        },
      },
    ],
  },
];

app.on("ready", () => {
  mainPlasform = process.platform;
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
