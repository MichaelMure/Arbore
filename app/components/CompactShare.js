import React, {Component, PropTypes} from 'react'
import styles from './CompactShare.css'
import { Card, CardContent, CardHeader } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Text from 'material-ui/Text'
import { LinearProgress } from 'material-ui/Progress'

class CompactShare extends Component {
  render() {
    return (
      <Card>
        <CardHeader
          avatar={<Avatar
            alt={this.props.contact.name}
            src={this.props.contact.avatar}
          />}
          title={this.props.share.title}
          subhead={this.props.share.description}
        />
        { this.props.share.message &&
          <CardContent>
            <Text>
              {this.props.share.message}
            </Text>
          </CardContent>
        }
        <LinearProgress mode="determinate" value={this.props.share.progress}/>
      </Card>
    );
  }
}

CompactShare.propTypes = {
  share: PropTypes.object.isRequired,
  contact: PropTypes.object.isRequired
};
CompactShare.defaultProps = {};

export default CompactShare;
