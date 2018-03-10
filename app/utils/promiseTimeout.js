// @flow

export class ErrTimeout extends Error {}

/**
 * Wrap a Promise in another Promise with a timeout that reject it
 * @param t time in ms
 * @param promise
 * @returns {Promise<any>}
 */
export default (t: number, promise) => Promise.race([promise, failTimeout(t)])


const failTimeout = (t: number) => new Promise(
  (resolve, reject) => {
    setTimeout(() => reject(new ErrTimeout()), t)
  }
)
