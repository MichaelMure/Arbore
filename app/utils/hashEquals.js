// @flow
export default (hash1: string, hash2: string) => {
  return hash1.replace(/^\/ipfs\//, '') === hash2.replace(/^\/ipfs\//, '')
}
