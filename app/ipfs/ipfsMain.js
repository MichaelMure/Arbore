// @flow

import { IpfsConnector, ipfsEvents } from '@akashaproject/ipfs-connector'
import { BrowserWindow, ipcMain, app } from 'electron'

/*
 * Note: This is hacky and will bite me in the future.
 *
 * IpfsConnector is designed to run on the main electron process because
 * it needs to spawn the ipfs daemon and only the main process is able to
 * do that.
 *
 * Here, we actually have TWO instance of IpfsConnector. The first one
 * is on the main process and deal with the lifecycle of the daemon.
 * The second one is in the electron renderer process. It simply get
 * spawned when using IpfsConnector.getInstance() from the renderer.
 * As the memory is completely separated, the singleton pattern fail to
 * see that there is already another instance and spawn a second one.
 *
 * However, the second instance does not known about the the daemon
 * lifecycle and calls to the API probably work by pure chance as I don't
 * think it was engineered to be used like this.
 *
 * I added some IPC message to inform the renderer process of when the
 * API is available. This is a shortcut.
 *
 * The real solution could be to have the redux store and the logic in
 * the main process, with something to sync the store to the renderer
 * process. This will be needed to have a systray icon and to be able
 * to close the main window. But this is left for my future self or
 * as an exercice for the reader.
 */


let serviceStarted = false

export const isServiceStarted = 'is-ipfs-started'

export let gatewayRoot = 'http:///127.0.0.1:8080/ipfs/'

export const start = () => {
  const instance = IpfsConnector.getInstance()

  // set the download path for ipfs
  instance.setBinPath(
    app.getPath('userData')
  )

  instance.setOption('args', [
    'daemon',
    '--enable-pubsub-experiment'
  ])

  // install some event listeners
  instance.on(ipfsEvents.SERVICE_STARTED, onServiceStarted)
  instance.on(ipfsEvents.SERVICE_STOPPING, onServiceStopping)
  instance.on(ipfsEvents.SERVICE_FAILED, onServiceFailed)

  // reply when a renderer process ask if ipfs is ready
  ipcMain.on(isServiceStarted, (event) => {
    event.returnValue = serviceStarted
  })

  // start ipfs daemon and download binaries if needed
  instance.start()
}

const onServiceStarted = async () => {
  const instance = IpfsConnector.getInstance()
  const versionOK = await instance.checkVersion()

  if(!versionOK) {
    console.log("Need to update IPFS")
    await instance.stop()
    await instance.downloadManager.deleteBin()
    instance.start()
    return
  }

  console.log('Main: Ipfs service started')

  serviceStarted = true

  // Inform all renderer process
  BrowserWindow.getAllWindows()
    .forEach(win => win.webContents.send(ipfsEvents.SERVICE_STARTED))
}

const onServiceStopping = () => {
  console.log('Main: Ipfs service stopping')

  serviceStarted = false

  // Inform all renderer process
  BrowserWindow.getAllWindows()
    .forEach(win => win.webContents.send(ipfsEvents.SERVICE_STOPPING))
}

const onServiceFailed = () => {
  console.log('Main: Ipfs service failed')

  serviceStarted = false

  // Inform all renderer process
  BrowserWindow.getAllWindows()
    .forEach(win => win.webContents.send(ipfsEvents.SERVICE_FAILED))
}

export const stop = () => {
  const instance = IpfsConnector.getInstance()
  instance.stop()
}
