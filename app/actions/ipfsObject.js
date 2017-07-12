// @flow
import { createAction } from 'redux-actions'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/index'
import { createWriteStream, mkdirSync } from 'fs'
import { join } from 'path'
import { Readable } from 'stream'

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

/**
 * Export an ipfs object on disk
 * @param hash the hash of the object
 * @param name the name of the object
 * @param basepath the directory where to put the data
 */
export function exportObject(hash: string, name: string, basepath: string) {
  return async function (dispatch) {
    console.log(`Exporting ${name} to ${basepath}`)

    const instance = IpfsConnector.getInstance()

    await waitForIpfsReady()

    const stream = await instance.api.apiClient.get(hash)

    await new Promise(function(resolve, reject) {
      stream.on('data', (file) => {

        const finalDest = join(basepath, name, file.path.replace(hash, ''))

        // First make all the directories
        if (!file.content) {
          mkdirSync(finalDest)
        } else {
          // Pipe the file content into an actual write stream
          const writeStream = createWriteStream(finalDest)
          file.content.pipe(writeStream)
        }
      })

      stream.on('error', reject)
      stream.on('end', resolve)
    })
  }
}

/**
 * Check if an object is fully local
 * @param hash
 */
export function isLocal(hash: string) {
  return async function() {
    console.log(`IsLocal: ${hash}`)

    const instance = IpfsConnector.getInstance()

    await waitForIpfsReady()

    // This is mostly a hack, it assume the fact that the pinner add a pin only
    // when an object is fully local
    return new Promise(function(resolve, reject) {
      instance.api.apiClient.pin.ls(hash, (err, pinset) => {
        if(err) {
          resolve(false)
          return
        }

        try {
          resolve(pinset[hash].Type === 'recursive')
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

/**
 * Trigger a download. Resolve when the download is done or when an error occured.
 * @param hash
 * @returns {Function}
 */
export function triggerDownload(hash: string) {
  return async function() {
    console.log(`triggerDownload: ${hash}`)

    const instance = IpfsConnector.getInstance()

    await waitForIpfsReady()

    return instance.api.apiClient.pin.add(hash)
  }
}
