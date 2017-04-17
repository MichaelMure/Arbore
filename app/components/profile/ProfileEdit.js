// @flow
import React, { Component } from 'react'
import styles from './Profile.css'
import Profile from 'models/Profile'
import Input from 'material-ui/Input'
import Text from 'material-ui/Text'
import Avatar from 'material-ui/Avatar'
import AvatarEditor from 'react-avatar-editor'
import Button from 'material-ui/Button'
import canvasBuffer from 'electron-canvas-to-buffer'

const dialog = require('electron').remote.dialog

class ProfileEdit extends Component {

  props : {
    profile: Profile,
    onTest: () => void,
    onAvatarChange: (Buffer) => () => void
  }

  constructor(props) {
    super(props)
    this.state = { image: null, scale: 1 }
  }

  openFileDialog(){
    const result = dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        {name: 'Images', extensions: ['jpg', 'jpeg', 'png']}
      ]
    })

    if(result) {
      this.setState({image: result[0]})
    }
  }

  onZoomChange(e) {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  onClickSave () {
    if(!this.avatarEditor) {
      return
    }
    const canvasScaled = this.avatarEditor.getImageScaledToCanvas()
    const buffer = canvasBuffer(canvasScaled, 'image/png')
    this.props.onAvatarChange(buffer)()
  }

  render() {
    const profile = this.props.profile
    return (
      <div>
        <Text>Profile</Text>
        <Avatar
          src={profile.avatarData}
          className={styles.avatar}
        />
        <Input placeholder="Identity" />

        { this.state.image === null ? (
          <div className={ styles.selectAvatar } onClick={::this.openFileDialog} >
            Select an avatar
          </div>
          ) : (
          <div>
            <AvatarEditor
              image={this.state.image}
              ref={(editor) => { this.avatarEditor = editor }}
              width={200}
              height={200}
              borderRadius={5000}
              color={[255, 255, 255, 1]}
              style={{margin: '0 auto'}}
              scale={parseFloat(this.state.scale)}
            />
            {/* TODO: replace with Slider once material-ui is ready */}
            <Input
              type='range'
              min='1'
              max='2'
              step='0.01'
              defaultValue='1'
              onChange={::this.onZoomChange}
            />
          </div>
        )}

        <Button accent onClick={::this.onClickSave}>Submit</Button>

        <Button onClick={this.props.onTest}>TEST</Button>
      </div>
    );
  }
}

export default ProfileEdit;
