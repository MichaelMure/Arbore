// @flow
export default (data: ?Buffer): ?string => {
  if(!data) {
    // return null

    // TODO: remove that
    return "https://s3.amazonaws.com/uifaces/faces/twitter/rem/73.jpg"
  }
  return 'data:image/png;base64,' + data.toString('base64')
}
