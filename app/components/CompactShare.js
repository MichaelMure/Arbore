import React, {Component, PropTypes} from 'react'
import styles from './CompactShare.css'
import classNames from 'classnames/bind';
import { Card, CardContent, CardHeader } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Text from 'material-ui/Text'
import { LinearProgress } from 'material-ui/Progress'
import Share from "../models/Share";

const cx = classNames.bind(styles);

class CompactShare extends Component {
  render() {
    const share = this.props.share

    const cardClass = cx({
      card: true,
      cardSelected: this.props.selected
    })

    return (
      <Card className={cardClass} onClick={this.props.onClick}>
        <CardHeader
          avatar={<Avatar
            alt={share.author.name}
            src={share.author.avatar}
          />}
          title={share.metadata.title}
          subhead={share.metadata.description}
        />
        { share.metadata.message &&
          <CardContent>
            <Text>
              {share.metadata.message}
            </Text>
          </CardContent>
        }
        <LinearProgress mode="determinate" value={share.progress}/>
      </Card>
    );
  }
}

CompactShare.propTypes = {
  share: PropTypes.instanceOf(Share).isRequired,
  selected: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
CompactShare.defaultProps = {
  selected: false
};

export default CompactShare;
