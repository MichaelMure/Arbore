import React, {Component, PropTypes} from 'react';
import styles from './ShareDetail.css';
import { Card, CardContent, CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Text from 'material-ui/Text'
import FontAwesome from 'react-fontawesome';
import IconButton from 'material-ui/IconButton';
import { LinearProgress } from 'material-ui/Progress';
import ShareFiles from './ShareFiles2'
import Share from '../models/Share'
import * as humanize from '../utils/humanize'

class ShareDetail extends Component {
  render() {
    const share: Share = this.props.share

    const avatar = (
      <Avatar alt={share.author.name} src={share.author.avatar} />
    )
    const header = (
      <CardHeader
        avatar={avatar}
        title={share.metadata.title}
        subhead={share.metadata.description} />
    )

    return (
      <div className={styles.wrapper}>
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
          <Text>{humanize.filesizeNoUnit(share.sizeLocal)} of {humanize.filesize(share.sizeTotal)} ({share.progress * 100}%)</Text>
          <Text>3/4 peers</Text>
          <Text>1.03Mo/s</Text>
        </div>
        <div className={styles.spacer} />
        <Text type="subheading" component="h2">Description</Text>
        <Text component="p">{share.metadata.message}</Text>
        <div className={styles.spacer} />
        <ShareFiles share={share} style="margin:30px"/>
      </div>
    );
  }
}

ShareDetail.propTypes = {
  share: PropTypes.instanceOf(Share).isRequired,
  onStartClickGenerator: PropTypes.func.isRequired,
  onPauseClickGenerator: PropTypes.func.isRequired,
  onStopClickGenerator: PropTypes.func.isRequired,
  onFavoriteClickGenerator: PropTypes.func.isRequired
};
ShareDetail.defaultProps = {};

export default ShareDetail;
