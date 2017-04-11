// @flow
import { ipcRenderer } from 'electron'
import { isServiceStarted } from './ipfsMain'
import { ipfsEvents } from '@akashaproject/ipfs-connector'

let serviceStarted = undefined
let initializing = false

const start = () => {
  if(initializing) {
    // we have concurent initialisation, only execute the first
    return
  }

  initializing = true

  serviceStarted = ipcRenderer.sendSync(isServiceStarted)
  console.log('Found that serviceStarted is ' + serviceStarted)

  ipcRenderer.on(ipfsEvents.SERVICE_STARTED, () => {
    console.log('Renderer: Ipfs service started')
    serviceStarted = true
  })

  ipcRenderer.on(ipfsEvents.SERVICE_STOPPING, () => {
    console.log('Renderer: Ipfs service stopped')
    serviceStarted = false
  })

  ipcRenderer.on(ipfsEvents.SERVICE_FAILED, () => {
    console.log('Renderer: Ipfs service failed')
    serviceStarted = false
  })
}

export function waitForIpfsReady() {
  let started = serviceStarted

  if(started === undefined) {
    start()
    started = ipcRenderer.sendSync(isServiceStarted)
  }

  if(started) {
    // already good
    return Promise.resolve()
  }

  // wait for the ipfs started event
  return new Promise( function (resolve) {
    ipcRenderer.on(ipfsEvents.SERVICE_STARTED, resolve)
  })
}
