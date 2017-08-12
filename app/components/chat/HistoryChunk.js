// @flow
import React, { Component } from 'react'
import styles from './HistoryChunk.css'
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
    const { chunk, person} = this.props
    const time = chunk[0].time

    return (
      <div className={styles.cluster}>
        <Avatar person={person} className={styles.clusterAvatar}/>
        <div className={styles.clusterHistory}>
          <div className={styles.clusterHeader}>
            <span>{person.identity}</span>
            <span><Moment locale={app.getLocale()} format="LT">{time}</Moment></span>
          </div>
          {
            chunk.map((entry: ChatEntry, index) => (
              <div className={styles.entry} key={index}>
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

export default HistoryChunk
