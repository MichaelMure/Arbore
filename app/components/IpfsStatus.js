// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
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
    error: any
  }

  render() {
    const { classes, state, progress, error } = this.props

    if(state === ConnectorState.STARTED) {
      return null
    }

    let stateStr
    switch (state) {
      case ConnectorState.UNKNOW:      stateStr = 'Initializing ...';    break
      case ConnectorState.NO_BINARY:   stateStr = 'IPFS not found';    break
      case ConnectorState.DOWNLOADING: stateStr = 'Downloading IPFS';  break
      case ConnectorState.STOPPED:     stateStr = 'IPFS stopped';      break
      case ConnectorState.STARTING:    stateStr = 'IPFS starting...';  break
      case ConnectorState.STOPPING:    stateStr = 'IPFS stopping...';  break
      case ConnectorState.UPGRADING:   stateStr = 'IPFS upgrading...'; break
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
        <Typography variant="subheading">Hold on !</Typography>

        <div className={classes.spacer} />

        <Typography>It seems that the IPFS dameon is not started yet.</Typography>
        <Typography>{stateStr}</Typography>

        <div className={classes.progress}>
          { (state === ConnectorState.DOWNLOADING && progress) &&
            <div>
              <LinearProgress variant="determinate" value={100 * progress.completed / total} />
              <Typography>{humanize.filesizeNoUnit(progress.completed)} of {humanize.filesize(total)} ({Math.round(100 * progress.completed / total)}%)</Typography>
            </div>
          }
        </div>

        { error && <Error >{error}</Error>}
      </div>
    )
  }
}

const style = theme => ({
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
    backgroundColor: theme.palette.background.main,
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
})

export default withStyles(style)(IpfsStatus);
