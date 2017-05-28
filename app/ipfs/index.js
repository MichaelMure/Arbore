// @flow

export let gatewayRoot = 'http:///127.0.0.1:8080/ipfs/'

/// #if isElectron
export { waitForIpfsReady } from './ipfsRenderer'
/// #else
export { waitForIpfsReady } from './ipfsMonoProcess'
/// #endif


