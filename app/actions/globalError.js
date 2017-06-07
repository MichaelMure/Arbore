// @flow
import { createAction } from 'redux-actions'

export const setError = createAction('GLOBALERROR_SET',
  (text: string) => (text)
)
export const resetError = createAction('GLOBALERROR_RESET')
