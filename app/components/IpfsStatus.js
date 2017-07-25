// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import { LinearProgress } from 'material-ui/Progress'
import { ConnectorState } from '@akashaproject/ipfs-connector'
import Error from 'components/Error'
import * as humanize from 'utils/humanize'

class IpfsStatus extends Component {

  props: {
    state: number,
    // TODO: see below
    progress: any, // ?{ completed: number, total: number },
    error: ?string
  }

  render() {
    const { classes, state, progress, error } = this.props

    if(state === ConnectorState.STARTED) {
      return null
    }

    let stateStr
    switch (state) {
      case ConnectorState.UNKNOW:      stateStr = 'Initializing ...';    break
      case ConnectorState.NO_BINARY:   stateStr = 'Daemon not found';    break
      case ConnectorState.DOWNLOADING: stateStr = 'Downloading daemon';  break
      case ConnectorState.STOPPED:     stateStr = 'Daemon stopped';      break
      case ConnectorState.STARTING:    stateStr = 'Daemon starting...';  break
      case ConnectorState.STOPPING:    stateStr = 'Daemon stopping...';  break
      case ConnectorState.UPGRADING:   stateStr = 'Daemon upgrading...'; break
    }

    // TODO: remove
    // See https://github.com/AkashaProject/ipfs-connector/issues/15
    let total
    if(state === ConnectorState.DOWNLOADING && progress) {
      total = Array.isArray(progress.total) ? progress.total[0] : progress.total
      if(!Array.isArray(progress.total)) {
        console.log('remove all that')
      }
    }

    return (
      <div className={classes.wrapper}>
        <Typography type="subheading">Hold on !</Typography>

        <div className={classes.spacer} />

        <Typography>It seems that the IPFS dameon is not started yet.</Typography>
        <Typography>{stateStr}</Typography>

        <div className={classes.progress}>
          { (state === ConnectorState.DOWNLOADING && progress) &&
            <div>
              <LinearProgress mode="determinate" value={100 * progress.completed / total} />
              <Typography>{humanize.filesizeNoUnit(progress.completed)} of {humanize.filesize(total)} ({100 * progress.completed / total}%)</Typography>
            </div>
          }
        </div>

        { error && <Error >{error}</Error>}
      </div>
    )
  }
}

const styleSheet = createStyleSheet('IpfsStatus', theme => ({
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
    zIndex: 30,
  },
  spacer: {
    height: 20
  },
  progress: {
    marginTop: 15,
    width: 300,
    height: 40
  }
}))

export default withStyles(styleSheet)(IpfsStatus);
