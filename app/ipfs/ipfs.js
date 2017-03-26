// @flow

import { IpfsConnector, ipfsEvents } from '@akashaproject/ipfs-connector';

export const start = () => {
  const instance = IpfsConnector.getInstance();

  console.log(instance.downloadManager.getPath())

  // start ipfs daemon and download binaries if needed
  instance.start()

  instance.once(ipfsEvents.SERVICE_STARTED, function () {

    console.log('STARTED')
    instance.api.apiClient.version((err, version) => {
      if (err) {
        throw err
      }
      console.log(version)
    })
  });
}

export const stop = () => {
  const instance = IpfsConnector.getInstance();
  instance.stop()
}
