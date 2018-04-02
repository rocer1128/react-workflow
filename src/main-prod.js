"use strict";

const electron = require("electron");
const app = electron.app; // Module to control application life.
const BrowserWindow = electron.BrowserWindow; // Module to create native browser window.
const globalShortcut = electron.globalShortcut;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;
// Quit when all windows are closed.
// 
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != "darwin") {
    app.quit();
  }
});

// 当前应用准备退出
app.on("will-quit", function () {
  globalShortcut.unregisterAll();
})

function registerShortcut() {
  function doRegister(cmd, callback) {
    globalShortcut.register(cmd, callback);
  }

  doRegister("F12", function () {
    var win = BrowserWindow.getFocusedWindow();
    win.webContents.toggleDevTools();
    console.log("toggleDevTools F12");
  });

  // windows 平台下`F12`按键按下收不到消息(貌似还没有解决方案)，所以写了一个替代按键
  doRegister("F6", function () {
    var win = BrowserWindow.getFocusedWindow();
    win.webContents.toggleDevTools();
    console.log("toggleDevTools F6");
  });

  doRegister("F5", function () {
    var win = BrowserWindow.getFocusedWindow();
    win.reload();
    console.log("refresh");
  });

  return;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on("ready", function () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
  });


  // and load the index.html of the app.
  mainWindow.loadURL("file://" + __dirname + "/index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  registerShortcut();
  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});





