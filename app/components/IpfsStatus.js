// @flow
import React, { Component } from 'react'
import styles from './IpfsStatus.css'
import Typography from 'material-ui/Typography'
import { ConnectorState } from '@akashaproject/ipfs-connector'

class IpfsStatus extends Component {

  props: {
    state: number
  }

  render() {
    const { state } = this.props

    if(state === ConnectorState.STARTED) {
      return null
    }

    let stateStr
    switch (state) {
      case ConnectorState.UNKNOW:      stateStr = 'Initializing ...';   break
      case ConnectorState.NO_BINARY:   stateStr = 'Daemon not found';   break
      case ConnectorState.DOWNLOADING: stateStr = 'Downloading daemon'; break
      case ConnectorState.STOPPED:     stateStr = 'Daemon stopped';     break
      case ConnectorState.STARTING:    stateStr = 'Daemon starting...'; break
      case ConnectorState.STOPPING:    stateStr = 'Daemon stopping...'; break
    }

    return (
      <div className={styles.wrapper}>
        <Typography type="subheading">Hold on !</Typography>
        <Typography>It seems that the IPFS dameon is not started yet.</Typography>
        <Typography>{stateStr}</Typography>
      </div>
    )
  }
}

export default IpfsStatus
