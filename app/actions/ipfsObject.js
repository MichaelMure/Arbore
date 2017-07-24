// @flow
import { createAction } from 'redux-actions'
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/index'
import { createWriteStream, mkdirSync } from 'fs'
import { join } from 'path'
import { IpfsObject, ObjectType } from 'models/IpfsObject'

/*
 * This is what we use for now:
 *
 * Directory metadata: ipfs ls
 *  -> shortcoming, right now this doesn't tell the object type (dir/file) so we need
 *     to know beforehand. We use the higher level ipfs ls call to know the type down
 *     the graph but it doesn't work for the root as we don't have a higher level dir.
 *
 * Trigger a download: ipfs pin
 *  -> not sure if it's the best idea
 *
 * Track the progress:
 *  -> TODO
 */

export const priv = {
  receivedDirMetadata: createAction('DIR_METADATA_RECEIVED',
    (hash: string, links: []) => ({hash, links})
  ),
  isLocal: createAction('IPFS_OBJECT_LOCAL',
    (hash: string, isLocal: boolean) => ({hash, isLocal})
  )
}

// Request metadata from ipfs for an unknow object
export function fetchDirectoryMetadata(hash) {
  return async function (dispatch) {
    console.log('FETCH DIRECTORY METADATA OF ' + hash)

    const instance = IpfsConnector.getInstance()

    await waitForIpfsReady()

    const result = await instance.api.apiClient.ls(hash)
    const { Links } = result.Objects[0]

    // Store what we have
    dispatch(priv.receivedDirMetadata(hash, Links))

    // Request metadatas for each child directory
    await Promise.all(
      Links
        .filter(({Type}) => Type === 1)
        .map(({Hash}) => dispatch(fetchDirectoryMetadata(Hash)))
    )
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
 * Inspect a graph of IPFS object to update what is local or not
 * @param obj
 */
export function isLocalRecursive(obj: IpfsObject) {
  return async function(dispatch) {
    console.log(`IsLocalRecursive: ${obj.hash}`)

    const local = await dispatch(isLocal(obj.hash))

    if(local) {
      // Nothing more to do, everything under (if any) is local as well
      return true
    }

    if(obj.type === ObjectType.DIRECTORY) {
      // Request locality for each child directory
      await Promise.all(
        obj.children.map((child: IpfsObject) => dispatch(isLocalRecursive(child)))
      )
    }

    return false
  }
}

/**
 * Check if an object is fully local
 * @param hash
 */
export function isLocal(hash: string) {
  return async function(dispatch) {
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
          resolve(pinset[hash].Type === 'indirect' || pinset[hash].Type === 'recursive')
        } catch (e) {
          reject(e)
        }
      })
    }).then((isLocal: boolean) => {
      // Update redux
      dispatch(priv.isLocal(hash, isLocal))
      return isLocal
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
