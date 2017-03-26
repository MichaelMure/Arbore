// @flow
import React, {Component, PropTypes} from 'react';
import styles from './Profile.css';
import Model from '../models/Profile'
import Input from 'material-ui/Input'
import Text from 'material-ui/Text'
import Avatar from 'material-ui/Avatar'
import AvatarEditor from 'react-avatar-editor'
import Button from 'material-ui/Button'

class ProfileEdit extends Component {

  render() {
    const profile = this.props.profile
    return (
      <div>
        <Text>Profile</Text>
        <Avatar
          src={profile.avatar}
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
        <Button accent>Submit</Button>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  profile: PropTypes.instanceOf(Model).isRequired
};
ProfileEdit.defaultProps = {};

export default ProfileEdit;
