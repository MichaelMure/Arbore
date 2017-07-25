// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Typography from 'material-ui/Typography'

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

const styleSheet = createStyleSheet('InsetText', theme => ({
  text: {
    minHeight: 150,
    maxHeight: 300,
    overflow: 'auto',
    backgroundColor: theme.palette.background.appBar,
    borderRadius: 5,
    marginTop: '10px !important',
    whiteSpace: 'pre-line',
    padding: 2
  },
  placeholder: {
    minHeight: 150,
    color: 'gray !important',
    backgroundColor: theme.palette.background.appBar,
    borderRadius: 5,
    marginTop: '10px !important',
  }
}))

export default withStyles(styleSheet)(InsetText)
