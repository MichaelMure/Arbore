// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import ChatEntry from 'models/ChatEntry'
import Contact from 'models/Contact'
import Moment from 'react-moment'
import Avatar from 'components/common/Avatar'
import Profile from 'models/Profile'
import FontAwesome from 'react-fontawesome'

const app = require('electron').remote.app

class HistoryChunk extends Component {

  props: {
    chunk: ChatEntry[],
    person: Contact|Profile,
  }

  render() {
    const { classes, chunk, person} = this.props
    const time = chunk[0].time

    return (
      <div className={classes.cluster}>
        <Avatar person={person} className={classes.clusterAvatar}/>
        <div className={classes.clusterHistory}>
          <div className={classes.clusterHeader}>
            <Typography noWrap variant='caption' className={classes.identity}>{person.identity}</Typography>
            <Typography><Moment locale={app.getLocale()} format="LT">{time}</Moment></Typography>
          </div>
          {
            chunk.map((entry: ChatEntry, index) => (
              <div className={classes.entry} key={index}>
                <Typography>{entry.message}</Typography>
                { (entry.contactPubkey === null) &&
                  <Typography><FontAwesome name={ entry.ack ? 'check' : 'clock-o' } /></Typography>
                }
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const style = theme => ({
  cluster:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  clusterHeader:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  identity: {
    minWidth: 0,
    marginRight: 5,
  },
  clusterHistory:{
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'auto',
  },
  clusterAvatar:{
    width: '40px !important',
    height: '40px !important',
    marginRight: 10,
  },
  entry:{
    display: 'flex',
    justifyContent: 'space-between',
  },
})

export default withStyles(style)(HistoryChunk)
