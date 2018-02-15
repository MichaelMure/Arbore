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
  }

  render() {
    const { classes, onChange } = this.props

    const adornment = (
      <InputAdornment position="end">
        <IconButton>
          <FontAwesome name='search' />
        </IconButton>
      </InputAdornment>
    )

    return (
      <TextField label='Search'
                 fullWidth
                 onChange={onChange}
                 className={classes.search}
                 InputProps={{
                   endAdornment: adornment
                 }}
      />
    )
  }
}

const style = theme => ({
  search: {
    marginBottom: '30px !important',
    marginTop: '10px !important',
  },
})

export default withStyles(style)(SearchField);
