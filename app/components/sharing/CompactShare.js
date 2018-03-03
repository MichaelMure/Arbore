import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { darken } from 'material-ui/styles/colorManipulator'
import Card, { CardHeader } from 'material-ui/Card'
import { LinearProgress } from 'material-ui/Progress'
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

    return (
      <Card className={cardClass} onClick={this.props.onClick}>
        <CardHeader
          avatar={<Avatar person={author} />}
          title={share.title}
          subheader={share.description}
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
    backgroundColor: theme.palette.background.light,
  },
  cardSelected: {
    backgroundColor: theme.palette.background.darker,
  }
})

export default withStyles(style)(CompactShare)
