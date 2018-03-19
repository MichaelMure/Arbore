import { IpfsConnector } from '@michaelmure/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/index'

/**
 * Get the IPFS nodes's peer ID.
 * Function memoized for performance
 */
let peerID = undefined
export function getPeerID() {
  return async function () {
    if(peerID) {
      return peerID
    }

    console.log('Get peer ID')
    const ipfs: IpfsConnector = IpfsConnector.getInstance()

    await waitForIpfsReady()

    const { id } = await ipfs.api.apiClient.id()
    peerID = id

    console.log('Peer ID: ' + peerID)

    return peerID
  }
}

