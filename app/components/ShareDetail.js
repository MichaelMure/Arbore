import React, {Component, PropTypes} from 'react';
import styles from './ShareDetail.css';
import Layout from 'material-ui/Layout'
import { Card, CardContent, CardHeader, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Text from 'material-ui/Text'
import FontAwesome from 'react-fontawesome';
import IconButton from 'material-ui/IconButton';
import { LinearProgress } from 'material-ui/Progress';
import Share from "../models/Share";

class ShareDetail extends Component {
  render() {
    const share = this.props.share
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <CardHeader
            avatar={<Avatar
            alt={share.author.name}
            src={share.author.avatar}
          />}
            title={share.title}
            subhead={share.metadata.description}
          />
        </div>
        <div className={styles.content}>
          <LinearProgress mode="determinate" value={share.progress}/>
        </div>
      </div>

    );
  }
}

ShareDetail.propTypes = {
  share: PropTypes.instanceOf(Share).isRequired
};
ShareDetail.defaultProps = {};

export default ShareDetail;

/*
 <Card>
 <CardHeader
 avatar={}
 title="Share Title"
 subhead="Share description. Like a very long text with some HIuuuuuUUuuugge words. THe better words evar."
 />
 <Layout container>
 <Layout item xs>
 <Text>
 Optional description
 </Text>
 </Layout>
 <Layout item xs>
 <Text>
 25/03/2017
 </Text>
 <Text>
 1.56mo/s
 </Text>
 </Layout>


 </Layout>


 <CardActions actionSpacing={false}>
 <IconButton>
 <FontAwesome name='download' />
 </IconButton>
 <IconButton>
 <FontAwesome name='heart' />
 </IconButton>
 </CardActions>

 <LinearProgress />
 </Card>
 */
