// @flow
import React, { Component } from 'react'
import styles from './AvatarEditor.css'
import ReactAvatarEditor from 'react-avatar-editor'
import canvasBuffer from 'electron-canvas-to-buffer'
import { Input } from 'material-ui'
import FontAwesome from 'react-fontawesome'

const dialog = require('electron').remote.dialog


class AvatarEditor extends Component {

  constructor(props) {
    super(props)
    this.state = {
      image: null,
      scale: 1,
      rotation: 0
    }
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

  handleZoomChange(e) {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  handleRotateLeft() {
    this.setState(
      { rotation: this.state.rotation - 90 }
    )
  }

  handleRotateRight() {
    this.setState(
      { rotation: this.state.rotation + 90 }
    )
  }

  handleCloseImage() {
    this.setState({ image: null })
  }

  getPngImage () {
    if(!this.avatarEditor) {
      return
    }
    const canvasScaled = this.avatarEditor.getImageScaledToCanvas()
    return canvasBuffer(canvasScaled, 'image/png')
  }

  reset() {
    this.setState({
      image: null,
      scale: 1,
      rotation: 0
    })
  }

  render() {
    if( this.state.image === null) {
      return (
        <div className={ styles.selectAvatar } onClick={::this.openFileDialog} >
          Select an avatar
        </div>
      )
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <ReactAvatarEditor
            image={this.state.image}
            ref={(editor) => { this.avatarEditor = editor }}
            width={200}
            height={200}
            borderRadius={5000}
            color={[255, 255, 255, 1]}
            style={{margin: '0 auto'}}
            scale={parseFloat(this.state.scale)}
            rotate={this.state.rotation}
          />
          <div className={styles.actions}>
            <div>
              <div> </div>
              <FontAwesome name='times' onClick={ ::this.handleCloseImage } />
            </div>
            <div>
              <FontAwesome name='rotate-left' onClick={ ::this.handleRotateLeft } />
              <FontAwesome name='rotate-right' onClick={ ::this.handleRotateRight } />
            </div>
          </div>
        </div>
        {/* TODO: replace with Slider once material-ui is ready */}
        {/* https://github.com/callemall/material-ui/issues/4793 */}
        <div className={styles.zoomWrapper}>
          <div className={styles.zoomRail}> </div>
          <Input
            type='range'
            min='1'
            max='2'
            step='0.01'
            defaultValue='1'
            onChange={::this.handleZoomChange}
            disableUnderline={true}
          />
        </div>
      </div>
    )
  }
}

export default AvatarEditor
