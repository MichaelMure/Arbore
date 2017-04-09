// @flow
import { createAction } from 'redux-actions'
import { IpfsConnector } from '@akashaproject/ipfs-connector'

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

    instance.api.apiClient.ls(hash)
      .then(result => {
        const { Links } = result.Objects[0]
        // Store what we have
        dispatch(receivedDirMetadata(hash, Links))
        // Request more metadata for each child
        Links.forEach(({Hash, Type}) => {
          if(Type === 1) {
            dispatch(fetchDirectoryMetadata(Hash))
          }
          if(Type === 2) {
            dispatch(fetchFileMetadata(Hash))
          }
        })
      })
      .catch(error => {
        console.error(error)
      })
  }
}

// Request metadata from ipfs for a file
export function fetchFileMetadata(hash: string) {
  return function (dispatch) {
    console.log('FETCH FILE METADATA OF ' + hash)

    const instance = IpfsConnector.getInstance()

    instance.api.apiClient.object.stat(hash)
      .then(result => {
        // TODO: for a big file CumulativeSize will account for the child blocks overhead
        // so this is more than the real size of the file
        dispatch(receivedFileMetadata(hash, result.CumulativeSize))
      })
      .catch(error => {
        console.error(error)
      })
  }
}
