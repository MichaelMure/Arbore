// @flow
import React, { Component } from 'react'
import IpfsStatusComponent from 'components/IpfsStatus'
import { ConnectorState } from '@akashaproject/ipfs-connector'
import { ipcRenderer } from 'electron'
import { ipfsEvents } from '@akashaproject/ipfs-connector'
import { getServiceStatus } from 'ipfs/ipfsMain'

class IpfsStatus extends Component {

  state = {
    state: ConnectorState.UNKNOW
  }

  componentDidMount() {
    ipcRenderer.on(ipfsEvents.STATUS_UPDATE, this.handleStatusUpdate)

    this.setState({
      state: ipcRenderer.sendSync(getServiceStatus)
    })
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(ipfsEvents.STATUS_UPDATE, this.handleStatusUpdate)
  }

  // this syntax capture 'this' automatically
  // this is needed to be able to remove the listener without generating a new binded handler
  handleStatusUpdate = (e, state) => {
    this.setState({state})
  }

  render() {
    return (
      <IpfsStatusComponent state={this.state.state} />
    )
  }
}

export default IpfsStatus
