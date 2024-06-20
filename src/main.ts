import {
  setupTitlebar,
  attachTitlebarToWindow,
} from "custom-electron-titlebar/main";
import { app, BrowserWindow, shell } from "electron";
import path from "path";
import { appConfig } from './config';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

setupTitlebar();

const createWindow = () => {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: appConfig.appName,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, "preload.js"),
    },
    // transparent: true,
    frame: false,
    titleBarStyle: "hidden",
    titleBarOverlay: true,
  });
  const contents = win.webContents;

  attachTitlebarToWindow(win);

  // Load URL
  win.loadURL("https://chat.openai.com");

  // Prevent title change from the web page
  win.on('page-title-updated', (event) => {
    event.preventDefault();
  });

  contents.on('page-title-updated', (event) => {
    event.preventDefault();
  });

  contents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });

  // Open the DevTools.
  contents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
