// @flow
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import {InputAdornment} from 'material-ui/Input'
import FontAwesome from 'react-fontawesome'

export default class SearchField extends Component {

  props: {
    onChange: () => void,
    className: string,
  }

  render() {
    const { className, onChange } = this.props

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
                 margin='none'
                 onChange={onChange}
                 className={className}
                 InputProps={{
                   endAdornment: adornment
                 }}
      />
    )
  }
}

