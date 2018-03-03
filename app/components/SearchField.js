// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import {InputAdornment} from 'material-ui/Input'
import FontAwesome from 'react-fontawesome'

class SearchField extends Component {

  props: {
    onChange: () => void,
    className: string,
  }

  static defaultProps = {
    className: ''
  };

  render() {
    const { classes, className, onChange } = this.props

    const adornment = (
      <InputAdornment position="end">
        <IconButton>
          <FontAwesome name='search' />
        </IconButton>
      </InputAdornment>
    )

    return (
      // for some reason, the label of the textfield doesn't
      // respect the padding applied directly
      <div className={classes.search + ' ' + className}>
        <TextField label='Search'
                   fullWidth
                   onChange={onChange}
                   InputProps={{
                     endAdornment: adornment
                   }}
        />
      </div>
    )
  }
}

const style = theme => ({
  search: {
    padding: '0 10px 0',
    backgroundColor: theme.palette.background.darker,
  },
})

export default withStyles(style)(SearchField);
