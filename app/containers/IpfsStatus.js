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
    ipcRenderer.on(ipfsEvents.STATUS_UPDATE, (e, state) => {
      this.setState({state})
    })

    this.setState({
      state: ipcRenderer.sendSync(getServiceStatus)
    })
  }

  render() {
    return (
      <IpfsStatusComponent state={this.state.state} />
    )
  }
}

export default IpfsStatus
