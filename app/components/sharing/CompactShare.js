import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader } from 'material-ui/Card'
import { LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'
import Share from "models/Share"
import Contact from 'models/Contact'
import Profile from 'models/Profile'
import Avatar from 'components/common/Avatar'

class CompactShare extends Component {

  props: {
    share: Share,
    author: Contact|Profile|null,
    selected: ?boolean,
    onClick: () => void
  }

  static defaultProps = {
    selected: false
  }

  render() {
    const share: Share = this.props.share
    const { classes, author, selected } = this.props

    const cardClass = classNames(classes.card, {
      [classes.cardSelected]: selected,
    })

    const title = <Typography variant='body2' noWrap>
      {share.title}
    </Typography>

    const subheader = <Typography variant='body1' noWrap>
      {author.identity}
    </Typography>

    return (
      <Card className={cardClass} onClick={this.props.onClick}>
        <CardHeader
          avatar={<Avatar person={author} />}
          title={title}
          subheader={subheader}
          classes={{ content: classes.content }}
        />
        { (share.isDownloading || share.isPaused) &&
          <LinearProgress
            variant='determinate'
            value={share.progress * 100}
          />
        }
      </Card>
    );
  }
}

const style = theme => ({
  card: {
    marginTop: 10,
    backgroundColor: theme.palette.background.dark,
  },
  cardSelected: {
    backgroundColor: theme.palette.background.light,
  },
  content: {
    minWidth: 0,
    overflow: 'hidden',
  }
})

export default withStyles(style)(CompactShare)
