// @flow
import { IpfsConnector } from '@akashaproject/ipfs-connector'
import { waitForIpfsReady } from 'ipfs/index'

const PROTOCOL_VERSION = 1

/**
 * Encapsulate the handling of pubsub communication.
 *
 * @param name Name of the channel for debugging purpose
 * @param topic Pubsub topic to listen to.
 * @param handlers Collection of array to handle incoming messages.
 * @returns {{subscribe: subscribe, unsubscribe: unsubscribe, send: send}}
 */
export default function createProtocol(name: string, topic: string, handlers: {}) {

  let pubsubHandler = null

  /**
   * Start listening to the pubsub topic
   *
   * Need to be dispatched.
   * @returns {Function}
   */
  function subscribe() {
    return async function (dispatch, getState) {
      console.log('Subscribe to ' + name + ' ...')
      const ipfs: IpfsConnector = IpfsConnector.getInstance()

      await waitForIpfsReady()

      pubsubHandler = createHandler(dispatch, getState)

      return await ipfs.api.apiClient.pubsub.subscribe(topic, {}, pubsubHandler)
    }
  }

  /**
   * Stop listening to the pubsub topic.
   *
   * Need to be dispatched.
   * @returns {Function}
   */
  function unsubscribe() {
    return async function (dispatch) {
      console.log('Unsubscribe from ' + name + ' ...')
      const ipfs: IpfsConnector = IpfsConnector.getInstance()

      await waitForIpfsReady()

      return await ipfs.api.apiClient.pubsub.unsubscribe(topic, pubsubHandler)
    }
  }

  /**
   * Create an internal handler for incoming messages.
   *
   * Need to be dispatched.
   * @param dispatch
   * @param getState
   * @returns {Function}
   */
  function createHandler(dispatch, getState) {
    return async function (event) {
      // from is the IPFS node pubkey, not the pubkey of the identity
      const {data, from, /* topicCIDs */} = event

      const action = JSON.parse(data.toString())

      if(!action.protoVersion || action.protoVersion !== PROTOCOL_VERSION) {
        throw 'Unrecognized protocol version'
      }

      if (!handlers.hasOwnProperty(action.type)) {
        throw `Received corrupted ${name} action from ${from} with type ${action.type}`
      }

      try {
        await handlers[action.type](dispatch, getState, action.payload)
      } catch (err) {
        console.error(err)
      }
    }
  }

  /**
   * Send a message to the given pubsub topic.
   *
   * Need to be dispatched.
   * @param _topic
   * @param action
   * @returns {Function}
   */
  function send(_topic: string, action) {
    return async function (dispatch) {
      const ipfs: IpfsConnector = IpfsConnector.getInstance()
      await waitForIpfsReady()

      action.protoVersion = PROTOCOL_VERSION

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
