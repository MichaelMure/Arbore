import React, { Component } from 'react'
import styles from './CompactShare.css'
import Card, { CardHeader } from 'material-ui/Card'
import { LinearProgress } from 'material-ui/Progress'
import classNames from 'classnames/bind'
import Share from "models/Share"
import Contact from 'models/Contact'
import Profile from 'models/Profile'
import Avatar from 'components/common/Avatar'

const cx = classNames.bind(styles);

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
    const { share, author } = this.props

    const cardClass = cx({
      card: true,
      cardSelected: this.props.selected
    })

    return (
      <Card className={cardClass} onClick={this.props.onClick}>
        <CardHeader
          avatar={<Avatar person={author} />}
          title={share.title}
          subheader={share.description}
        />
        <LinearProgress mode="determinate" value={share.progress * 100}/>
      </Card>
    );
  }
}

export default CompactShare;
