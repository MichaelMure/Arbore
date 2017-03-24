// @flow
import React, {Component, PropTypes} from 'react';
import styles from './Profile.css';
import classNames from 'classnames/bind';
import Input from 'material-ui/Input'
import Text from 'material-ui/Text'
import Avatar from 'material-ui/Avatar'
import AvatarEditor from 'react-avatar-editor'

const cx = classNames.bind(styles);

class Profile extends Component {

  render() {

    let overlayClass = cx({
      overlay: true,
      overlayOpen: this.props.open
    })

    const drawerClass = cx({
      drawer: true,
      drawerOpen: this.props.open
    })

    return (
      <div className={styles.wrapper}>
        <div className={overlayClass} onClick={this.props.onBackgroundClick}/>
        <div className={drawerClass}>
          <Text>Profile</Text>
          <Avatar
            src="https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg"
            className={styles.avatar}
          />
          <Input placeholder="Identity" />
          <AvatarEditor
            image="https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg"
            width={200}
            height={200}
            borderRadius={5000}
            color={[255, 255, 255, 1]}
            style={{margin: '0 auto'}}
          />
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  onBackgroundClick: PropTypes.func.isRequired,
  open: PropTypes.bool
};
Profile.defaultProps = {
  open: false
};

export default Profile;
