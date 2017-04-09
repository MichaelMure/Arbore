// @flow

import { IpfsConnector, ipfsEvents } from '@akashaproject/ipfs-connector'

export const start = () => {
  const instance = IpfsConnector.getInstance()

  // start ipfs daemon and download binaries if needed
  instance.start()

  // install some event listeners
  instance.on(ipfsEvents.SERVICE_STARTED, onServiceStarted)
  instance.on(ipfsEvents.SERVICE_STOPPING, onServiceStopping)
}

const onServiceStarted = () => {
  const instance = IpfsConnector.getInstance()

  instance.api.apiClient.version((err, version) => {
    if (err) {
      throw err
    }
    console.log(version)
  })
}

const onServiceStopping = () => {
  console.log('Ipfs service stopping')
}

export const stop = () => {
  const instance = IpfsConnector.getInstance()
  instance.stop()
}
