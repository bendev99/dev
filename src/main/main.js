const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const db = require("../db/database");

const { registerHandlers } = require("./handlers");
registerHandlers();

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Development
  win.loadURL("http://localhost:5173");

  // Production
  // win.loadFile(path.join(__dirname, "../dist/index.html"));

  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
