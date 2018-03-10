// @flow

/**
 * Create a Promise that succeed after a time in ms
 * @param t
 * @returns {Promise<any>}
 */
export default (t: number) => new Promise(resolve => setTimeout(resolve, t))
