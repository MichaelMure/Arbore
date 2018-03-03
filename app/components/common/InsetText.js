// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import { fade } from 'material-ui/styles/colorManipulator'

class InsetText extends Component {

  props: {
    text: ?string,
    placeholder: string
  }

  render() {
    const { classes, text, placeholder } = this.props

    return text
        ? <Typography paragraph className={classes.text}>{text}</Typography>
        : <Typography paragraph className={classes.placeholder}>{placeholder}</Typography>
  }
}

const style = theme => {
  const backgroundColor = theme.palette.background.darker
  const color = theme.palette.getContrastText(backgroundColor)

  return {
    text: {
      minHeight: 150,
      maxHeight: 300,
      overflow: 'auto',
      backgroundColor: backgroundColor,
      color: color,
      borderRadius: 5,
      marginTop: '10px !important',
      whiteSpace: 'pre-line',
      padding: 2
    },
    placeholder: {
      minHeight: 150,
      backgroundColor: backgroundColor,
      color: fade(color, 0.6),
      borderRadius: 5,
      marginTop: '10px !important',
      padding: 2
    }
  }
}

export default withStyles(style)(InsetText)
