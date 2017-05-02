// @flow
import React  from 'react'
import { TextField } from 'material-ui'

export const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <TextField
    error={touched && (error != null)}
    {...input}
    {...custom}
  />
)
