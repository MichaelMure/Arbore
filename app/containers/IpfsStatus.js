// @flow
import React, { Component } from 'react'
import IpfsStatusComponent from 'components/IpfsStatus'
import { ConnectorState } from '@akashaproject/ipfs-connector'
import { ipcRenderer } from 'electron'
import { ipfsEvents } from '@akashaproject/ipfs-connector'
import { getServiceStatus } from 'ipfs/ipfsMain'
import { throttle } from 'throttle-debounce'

class IpfsStatus extends Component {
  progressHandler: any

  state = {
    state: ConnectorState.UNKNOW,
    progress: null,
    error: null
  }

  componentDidMount() {
    this.progressHandler = throttle(200, this.handleDownloadProgress)

    ipcRenderer.on(ipfsEvents.STATUS_UPDATE, this.handleStatusUpdate)
    ipcRenderer.on(ipfsEvents.DOWNLOAD_PROGRESS, this.progressHandler)
    ipcRenderer.on(ipfsEvents.DOWNLOAD_ERROR, this.handleDownloadError)

    this.setState({
      state: ipcRenderer.sendSync(getServiceStatus)
    })
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(ipfsEvents.STATUS_UPDATE, this.handleStatusUpdate)
    ipcRenderer.removeListener(ipfsEvents.DOWNLOAD_PROGRESS, this.progressHandler)
    ipcRenderer.removeListener(ipfsEvents.DOWNLOAD_ERROR, this.handleDownloadError)
  }

  // this syntax capture 'this' automatically
  // this is needed to be able to remove the listener without generating a new binded handler
  handleStatusUpdate = (e, state) => {
    this.setState({state})
  }

  handleDownloadProgress = (e, progress) => {
    this.setState({progress})
  }

  handleDownloadError = (e, error) => {
    this.setState({error})
  }

  render() {
    return (
      <IpfsStatusComponent {...this.state} />
    )
  }
}

export default IpfsStatus
