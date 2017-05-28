// @flow
import { createAction } from 'redux-actions'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/index'

/*
 * This is what we use for now:
 *
 * Directory metadata: ipfs ls
 *  -> shortcoming, right now this doesn't tell the object type (dir/file) so we need
 *     to know beforehand. We use the higher level ipfs ls call to know the type down
 *     the graph but it doesn't work for the root as we don't have a higher level dir.
 *
 * File metadata: nothing for now, maybe ipfs refs --recursive for the blocks details
 *
 * Trigger a download: ipfs pin
 *  -> not sure if it's the best idea
 *
 * Track the progress:
 *  -> TODO
 */

export const receivedFileMetadata = createAction('FILE_METADATA_RECEIVED',
  (hash: string, size: number) => ({hash, size})
)
export const receivedDirMetadata = createAction('DIR_METADATA_RECEIVED',
  (hash: string, links: []) => ({hash, links})
)

// Request metadata from ipfs for an unknow object
export function fetchDirectoryMetadata(hash) {
  return function (dispatch) {
    console.log('FETCH DIRECTORY METADATA OF ' + hash)

    const instance = IpfsConnector.getInstance()

    waitForIpfsReady().then(() => {
      instance.api.apiClient.ls(hash)
        .then(result => {
          const { Links } = result.Objects[0]
          // Store what we have
          dispatch(receivedDirMetadata(hash, Links))
          // Request more metadata for each child
          Links.forEach(({Hash, Type, Size}) => {
            if(Type === 1) {
              dispatch(fetchDirectoryMetadata(Hash))
            }
            if(Type === 2) {
              dispatch(fetchFileMetadata(Hash, Size))
            }
          })
        })
        .catch(error => {
          console.error(error)
        })
    })
  }
}

// Request metadata from ipfs for a file
export function fetchFileMetadata(hash: string, size: number) {
  return function (dispatch) {
    dispatch(receivedFileMetadata(hash, size))
    return;

    // TODO: do we need the block detail ?

    console.log('FETCH FILE METADATA OF ' + hash)

    const instance = IpfsConnector.getInstance()

    // TODO: use ipfs refs --recursive

    waitForIpfsReady().then(() => {
      instance.api.apiClient.object.stat(hash)
        .then(result => {
          dispatch(receivedFileMetadata(hash, size))
        })
        .catch(error => {
          console.error(error)
        })
    })
  }
}

export function fetchLocalObject() {
  console.log('FETCH LOCAL OBJECT')

  return function (dispatch) {
    const instance = IpfsConnector.getInstance()

    waitForIpfsReady().then(() => {
      instance.api.apiClient.refs.local()
        .then(result => {
          // console.log(result)
          console.log('RESULT')
        })
    })
  }
}
