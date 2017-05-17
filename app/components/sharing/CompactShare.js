import React, { Component } from 'react'
import styles from './CompactShare.css'
import Card, { CardHeader } from 'material-ui/Card'
import { LinearProgress } from 'material-ui/Progress'
import classNames from 'classnames/bind'
import Share from "models/Share"
import Avatar from 'components/Avatar'

const cx = classNames.bind(styles);

class CompactShare extends Component {

  props: {
    share: Share,
    selected: ?boolean,
    onClick: () => void
  }

  static defaultProps = {
    selected: false
  }

  render() {
    const share = this.props.share

    const cardClass = cx({
      card: true,
      cardSelected: this.props.selected
    })

    return (
      <Card className={cardClass} onClick={this.props.onClick}>
        <CardHeader
          avatar={<Avatar person={share.author} />}
          title={share.metadata.title}
          subheader={share.metadata.description}
        />
        <LinearProgress mode="determinate" value={share.progress * 100}/>
      </Card>
    );
  }
}

export default CompactShare;
