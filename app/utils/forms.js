// @flow
import React  from 'react'
import { TextField } from 'material-ui'

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    error={ touched && (error != null) }
    label={ (error != null) ? error : label }
    {...input}
    {...custom}
  />
)
