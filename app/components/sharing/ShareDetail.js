import { CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import { LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'
import Share from 'models/Share'
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import * as humanize from 'utils/humanize'
import styles from './ShareDetail.css'
import ShareFiles from './ShareFiles2'
import Avatar from 'components/Avatar'

class ShareDetail extends Component {

  props: {
    share: Share,
    onStartClickGenerator: (Share) => any,
    onPauseClickGenerator: (Share) => any,
    onStopClickGenerator: (Share) => any,
    onFavoriteClickGenerator: (Share) => any,
  }

  render() {
    const share: Share = this.props.share

    const avatar = (
      <Avatar person={share.author} />
    )
    const header = (
      <CardHeader
        avatar={avatar}
        title={share.metadata.title}
        subheader={share.metadata.description} />
    )

    return (
      <div className={styles.wrapper} key={share.id}>
        <div className={styles.header}>
          {header}
          <div className={styles.actions}>
            { (share.isAvailable || share.isPaused) &&
            <IconButton onClick={ this.props.onStartClickGenerator(share) }>
              <FontAwesome name='play' />
            </IconButton>
            }
            { share.isDownloading &&
              <IconButton onClick={ this.props.onPauseClickGenerator(share) }>
                <FontAwesome name='pause' />
              </IconButton>
            }
            { (share.isDownloading || share.isPaused) &&
              <IconButton onClick={ this.props.onStopClickGenerator(share) }>
                <FontAwesome name='stop' />
              </IconButton>
            }
            <IconButton
              accent={ share.favorite }
              onClick={ this.props.onFavoriteClickGenerator(share) }>
              <FontAwesome name='heart' />
            </IconButton>
          </div>
        </div>
        <LinearProgress mode="determinate" value={share.progress * 100}/>
        <div className={styles.stats}>
          <Typography>{humanize.filesizeNoUnit(share.sizeLocal)} of {humanize.filesize(share.sizeTotal)} ({share.progress * 100}%)</Typography>
          <Typography>3/4 peers</Typography>
          <Typography>1.03Mo/s</Typography>
        </div>
        <div className={styles.spacer} />
        <Typography type="subheading" component="h2">Description</Typography>
        <Typography component="p">{share.metadata.message}</Typography>
        <div className={styles.spacer} />
        <ShareFiles share={share} style="margin:30px"/>
      </div>
    );
  }
}

export default ShareDetail;
