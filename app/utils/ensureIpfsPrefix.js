// @flow
export default (hash: string) => {
  if(! hash.startsWith('/ipfs/')) {
    return '/ipfs/' + hash
  }
  return hash
}
