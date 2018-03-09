// @flow

import { IpfsConnector, ipfsEvents } from '@michaelmure/ipfs-connector'

let serviceStarted = false

export function waitForIpfsReady() {
  if(serviceStarted) {
    // already good
    return Promise.resolve()
  }

  const instance = IpfsConnector.getInstance()

  // wait for the ipfs started event
  return new Promise( function (resolve) {
    instance.on(ipfsEvents.SERVICE_STARTED, () => {
      serviceStarted = true
      resolve()
    })
  })
}

export const start = () => {
  const instance = IpfsConnector.getInstance()

  instance.setOption('args', [
    'daemon',
    '--enable-pubsub-experiment'
  ])

  // install some event listeners
  instance.on(ipfsEvents.SERVICE_STARTED, onServiceStarted)
  instance.on(ipfsEvents.SERVICE_STARTING, onServiceStarting)
  instance.on(ipfsEvents.SERVICE_STOPPING, onServiceStopping)
  instance.on(ipfsEvents.SERVICE_FAILED, onServiceFailed)

  // start ipfs daemon and download binaries if needed
  instance.start()
}

const onServiceStarting = async () => {
  console.log('Main: Ipfs service starting')

  serviceStarted = false
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

  console.log('Ipfs service started')

  serviceStarted = true
}

const onServiceStopping = () => {
  console.log('Main: Ipfs service stopping')

  serviceStarted = false
}

const onServiceFailed = () => {
  console.log('Main: Ipfs service failed')

  serviceStarted = false
}

export const stop = () => {
  const instance = IpfsConnector.getInstance()
  instance.stop()
}
