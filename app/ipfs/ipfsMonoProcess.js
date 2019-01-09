// @flow

import { IpfsConnector, ipfsEvents, ConnectorState } from '@akashaproject/ipfs-connector'

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

  const userData = app.getPath('userData')

  console.log('Application data path: ' + userData)

  // set the download path for ipfs
  instance.setBinPath(userData)

  // set the ipfs repository path
  instance.setIpfsFolder(path.join(userData, '/repo'))

  instance.setOption('args', [
    'daemon',
    '--enable-pubsub-experiment',
    '--enable-namesys-pubsub'
  ])

  instance.enableDownloadEvents()

  // install some event listeners
  instance.on(ipfsEvents.SERVICE_STARTING, onServiceStarting)
  instance.on(ipfsEvents.SERVICE_STARTED, onServiceStarted)
  instance.on(ipfsEvents.UPGRADING_BINARY, onServiceUpgrade)
  instance.on(ipfsEvents.SERVICE_STOPPING, onServiceStopping)
  instance.on(ipfsEvents.SERVICE_FAILED, onServiceFailed)
  instance.on(ipfsEvents.STATUS_UPDATE, onStatusUpdate)
  instance.on(ipfsEvents.DOWNLOAD_PROGRESS, onDownloadProgress)
  instance.on(ipfsEvents.DOWNLOAD_ERROR, onDownloadError)

  // start ipfs daemon and download binaries if needed
  instance.start()
}

const onServiceStarting = async () => {
  console.log('Ipfs service starting')

  serviceStarted = false
}

const onServiceStarted = async () => {
  console.log('Ipfs service started')

  serviceStarted = true
}

const onServiceUpgrade = () => {
  console.log('Ipfs service upgrading')

  serviceStarted = false
}

const onServiceStopping = () => {
  console.log('Ipfs service stopping')

  serviceStarted = false
}

const onServiceFailed = () => {
  console.log('Ipfs service failed')

  serviceStarted = false
}

const onStatusUpdate = (state) => {
  console.log('Ipfs status update: ' + ConnectorState[state])
}

const onDownloadProgress = (progress) => {
  console.log(`Ipfs daemon download progress: ${progress.completed} / ${progress.total}`)
}

const onDownloadError = (error) => {
  console.log(`Ipfs download error: ${error}`)
}

export const stop = () => {
  const instance = IpfsConnector.getInstance()
  instance.stop()
}
