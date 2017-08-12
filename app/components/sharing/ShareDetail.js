import React, { Component } from 'react'
import styles from './ShareDetail.css'
import { CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import { LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'
import Share from 'models/Share'
import Profile from 'models/Profile'
import FontAwesome from 'react-fontawesome'
import * as humanize from 'utils/humanize'
import ShareFiles from './ShareFiles'
import Avatar from 'components/common/Avatar'
import ContactList from 'models/ContactList'
import InsetText from 'components/common/InsetText'
import ShareRecipients from 'containers/sharing/ShareRecipients'

class ShareDetail extends Component {

  props: {
    share: Share,
    profile: Profile,
    contactList: ContactList,
    onStartClickGenerator: (Share) => any,
    onPauseClickGenerator: (Share) => any,
    onStopClickGenerator: (Share) => any,
    onFavoriteClickGenerator: (Share) => any,
  }

  render() {
    const share: Share = this.props.share
    const { profile, contactList } = this.props

    const author = share.isAuthor
      ? profile
      : contactList.findContactInDirectory(share.authorPubkey)

    const avatar = (
      <Avatar person={author} />
    )
    const header = (
      <CardHeader
        avatar={avatar}
        title={share.title}
        subheader={share.description} />
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
              color={ share.favorite ? 'accent' : 'default'}
              onClick={ this.props.onFavoriteClickGenerator(share) }>
              <FontAwesome name='heart' />
            </IconButton>
          </div>
        </div>

        { share.isDownloading || share.isPaused &&
          <div>
            <LinearProgress mode="determinate" value={share.progress * 100}/>
            <div className={styles.stats}>
              <Typography>{humanize.filesizeNoUnit(share.sizeLocal)} of {humanize.filesize(share.sizeTotal)} ({share.progress * 100}%)</Typography>
              <Typography>3/4 peers</Typography>
              <Typography>1.03Mo/s</Typography>
            </div>
          </div>
        }


        <InsetText text={share.description} placeholder='No description' />
        <ShareRecipients recipients={share.recipients} />
        <ShareFiles share={share} style="margin:30px"/>
      </div>
    );
  }
}

export default ShareDetail;
