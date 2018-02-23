// @flow
import { app, BrowserWindow, ipcMain } from 'electron'
import * as ipfs from './ipfs/ipfsMain'
import { mainWindowVisible, showMainWindow } from './utils/constants'
import windowStateKeeper from 'electron-window-state'

let mainWindow = null;
let splashScreen = null

ipcMain.on(mainWindowVisible, (event) => {
  event.returnValue = mainWindow && mainWindow.isVisible()
})

ipcMain.on(showMainWindow, () => {
  if(mainWindow.isMinimized()) {
    mainWindow.restore()
  }
  mainWindow.focus()
})

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  ipfs.stop()
  if (process.platform !== 'darwin') app.quit();
})

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer') // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ]

    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

    // TODO: Use async interation statement.
    //       Waiting on https://github.com/tc39/proposal-async-iteration
    //       Promises will fail silently, which isn't what we want in development
    return Promise
      .all(extensions.map(name => installer.default(installer[name], forceDownload)))
      .catch(console.log)
  }
};

app.on('ready', async () => {
  await installExtensions()

  splashScreen = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    movable: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    closable: false,
    webPreferences: {
      devTools: false,
      javascript: false,
      nodeIntegration: false
    }
  })

  splashScreen.webContents.on('did-finish-load', () => {
    if (splashScreen) {
      splashScreen.show()
    }
  })

  splashScreen.loadURL(`file://${__dirname}/splashScreen.html`)

  // Load the previous window state with fallback to defaults
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1000,
    defaultHeight: 800
  });

  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    minWidth: 800,
    minHeight: 600,
    show: false,
    toolbar: false
  })
  mainWindow.setMenu(null)

  mainWindowState.manage(mainWindow)

  // mainWindow.on('ready-to-show', () => {
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined')
    }
    if(splashScreen) {
      splashScreen.destroy()
    }
    splashScreen = null

    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipfs.start()
})

