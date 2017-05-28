// @flow
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/index'

// Encapsulate the handling of pubsub communication
export default function createProtocol(name: string, topic: string, handlers: {}) {

  let pubsubHandler = null

  function subscribe() {
    return async function (dispatch, getState) {
      console.log('Subscribe to ' + name + ' ...')
      const ipfs: IpfsConnector = IpfsConnector.getInstance()

      await waitForIpfsReady()

      pubsubHandler = createHandler(dispatch, getState)

      return await ipfs.api.apiClient.pubsub.subscribe(topic, {}, pubsubHandler)
    }
  }

  function unsubscribe() {
    return async function (dispatch) {
      console.log('Unsubscribe from ' + name + ' ...')
      const ipfs: IpfsConnector = IpfsConnector.getInstance()

      await waitForIpfsReady()

      return await ipfs.api.apiClient.pubsub.unsubscribe(topic, pubsubHandler)
    }
  }

  function createHandler(dispatch, getState) {
    return function (event) {
      const {data, from, /* topicCIDs */} = event

      const action = JSON.parse(data.toString())

      if (!handlers.hasOwnProperty(action.type)) {
        throw 'Received corrupted ' + name + ' action from ' + from
      }

      handlers[action.type](dispatch, getState, action.payload)
    }
  }

  function send(_topic: string, action) {
    return async function (dispatch) {
      const ipfs: IpfsConnector = IpfsConnector.getInstance()
      await waitForIpfsReady()

      const serialized = Buffer.from(JSON.stringify(action))
      await ipfs.api.apiClient.pubsub.publish(_topic, serialized)
    }
  }

  return {
    subscribe,
    unsubscribe,
    send
  }
}
