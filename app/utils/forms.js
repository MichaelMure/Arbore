// @flow
import React  from 'react'
import TextField from 'material-ui/TextField'

export const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <TextField
    error={touched && (error != null)}
    {...input}
    {...custom}
  />
)
