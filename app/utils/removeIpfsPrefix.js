// @flow
export default (hash: string) => {
  return hash.replace(/^\/ipfs\//, '');
}
