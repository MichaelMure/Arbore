// @flow
import React, { Component } from 'react'
import styles from './AvatarEditor.css'
import ReactAvatarEditor from 'react-avatar-editor'
import canvasBuffer from 'electron-canvas-to-buffer'
import FontAwesome from 'react-fontawesome'

const dialog = require('electron').remote.dialog

export const AVATAR_DELETED = 'avatar-deleted'

class AvatarEditor extends Component {

  props: {
    placeholder: ?string,
    onPristineChanged: ?(() => any)
  }

  static defaultProps = {
    placeholder: null,
    onPristineChanged: null
  }

  constructor(props) {
    super(props)
    this.state = {
      image: null,
      scale: 1,
      rotation: 0,
      imageChanged: false,
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
      this.setState({
        image: result[0],
        imageChanged: true
      }, this.triggerPristineChanged)
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
    this.setState({
      image: null,
      imageChanged: true
    }, this.triggerPristineChanged)
  }

  triggerPristineChanged() {
    if(this.props.onPristineChanged !== null) {
      this.props.onPristineChanged()
    }
  }

  /**
   * Return either:
   * null: no changes, if a placeholder is present, it should be kept
   * AVATAR_DELETED: a placeholder was present and was removed
   * Buffer: a new image has been selected
   */
  getImage (): string|?Buffer {
    if(this.props.placeholder && this.state.image === null && this.state.imageChanged) {
      return AVATAR_DELETED
    }
    if(this.state.image === null) {
      return null
    }
    const canvasScaled = this.avatarEditor.getImageScaledToCanvas()
    return canvasBuffer(canvasScaled, 'image/png')
  }

  get pristine(): boolean {
    return !(this.state.imageChanged)
  }

  reset() {
    this.setState({
      image: null,
      scale: 1,
      rotation: 0,
      imageChanged: false
    })
  }

  render() {
    if( this.state.image === null) {
      if(this.props.placeholder !== null && !this.state.imageChanged) {
        return (
          <div className={styles.avatar}>
            <img src={this.props.placeholder} className={styles.placeholder} />
            <div className={styles.actions}>
              <div>
                <div> </div>
                <FontAwesome name='times' onClick={ ::this.handleCloseImage } />
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className={ styles.selectAvatar } onClick={::this.openFileDialog} >
            Select an avatar
          </div>
        )
      }
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
          {/* TODO: replace with Slider once material-ui is ready */}
          {/* https://github.com/callemall/material-ui/issues/4793 */}
          <div className={styles.zoomWrapper}>
            <input
              type='range'
              min={1}
              max={4}
              step={0.01}
              defaultValue={1}
              value={this.state.zoom}
              onChange={::this.handleZoomChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default AvatarEditor
