import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
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
    const { classes, profile, contactList } = this.props

    const author = share.isAuthor
      ? profile
      : contactList.findContactInDirectory(share.authorPubkey)

    const avatar = <Avatar person={author} />

    const title = <Typography variant='title' noWrap>
      {share.title}
    </Typography>

      const subheader = <Typography variant='caption' noWrap>
      {author.identity}
    </Typography>

    const header = <CardHeader
        avatar={avatar}
        title={title}
        subheader={subheader}
        classes={{ root: classes.overflow, content: classes.overflow }}
    />

    return (
      <div className={classes.wrapper} key={share.id}>
        <div className={classes.header}>
          {header}
          <div className={classes.actions}>
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
              color={ share.favorite ? 'secondary' : 'default'}
              onClick={ this.props.onFavoriteClickGenerator(share) }>
              <FontAwesome name={ share.favorite ? 'star' :  'star-o' } />
            </IconButton>
          </div>
        </div>

        { (share.isDownloading || share.isPaused) &&
          <div>
            <LinearProgress variant="determinate" value={share.progress * 100}/>
            <div className={classes.stats}>
              <Typography>{humanize.filesizeNoUnit(share.sizeLocal)} of {humanize.filesize(share.sizeTotal)} ({share.progressFormatted})</Typography>
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

const style = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
  },
  overflow: {
    minWidth: 0,
    overflow: 'hidden',
  }
})

export default withStyles(style)(ShareDetail)
