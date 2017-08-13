// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import ReactAvatarEditor from 'react-avatar-editor'
import canvasBuffer from 'electron-canvas-to-buffer'
import FontAwesome from 'react-fontawesome'
import Typography from 'material-ui/Typography'

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
    const { classes, theme, placeholder } = this.props

    if( this.state.image === null) {
      if(placeholder !== null && !this.state.imageChanged) {
        return (
          <div className={classes.avatar}>
            <img src={placeholder} className={classes.placeholder} />
            <div className={classes.actions}>
              <div>
                <div> </div>
                <FontAwesome name='times' onClick={ ::this.handleCloseImage } />
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className={ classes.selectAvatar } onClick={::this.openFileDialog} >
            <Typography>Select an avatar</Typography>
          </div>
        )
      }
    }

    return (
      <div className={classes.wrapper}>
        <div className={classes.avatar}>
          <ReactAvatarEditor
            image={this.state.image}
            ref={(editor) => { this.avatarEditor = editor }}
            width={200}
            height={200}
            borderRadius={5000}
            color={convertThemeColor(theme.palette.background.default)}
            style={{margin: '0 auto'}}
            scale={parseFloat(this.state.scale)}
            rotate={this.state.rotation}
          />
          <div className={classes.actions}>
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
          <div className={classes.zoomWrapper}>
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

/**
 * Convert a hex color ("#303030") to an array of rgba values ([48,48,48,1])
 * @param hex
 */
function convertThemeColor(hex) {
  const res = hex.match(/[a-f0-9]{2}/gi)
  if(!res || !res.length === 3) {
    throw 'Bad color'
  }

  return res.map(function(v) { return parseInt(v, 16) }).concat([1])
}

const styleSheet = createStyleSheet('AvatarEditor', theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  placeholder: {
    width: 200,
    height: 200,
    margin: '25px 25px 42px',
    borderRadius: '50%',
    userSelect: 'none',
    pointerEvents: 'none',
  },
  selectAvatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    margin: '25px 25px 42px',
    borderRadius: '50%',
    border: '4px dashed gray',
    cursor: 'pointer',
    userSelect: 'none',
  },
  avatar: {
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    pointerEvents: 'none',
    padding: 24,
    '& > div': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      width: '100%',
    },
    '& > div > *': {
      fontSize: '1.5em',
      cursor: 'pointer',
      pointerEvents: 'auto',
      color: 'gray',
    }
  },
  zoomWrapper: {
    position: 'relative',
    verticalAlign: 'middle',
    marginTop: -12,
    '& > *': {
      width: '100%',
      padding: 0,
    }
  }
}))

export default withStyles(styleSheet, { withTheme: true })(AvatarEditor)
