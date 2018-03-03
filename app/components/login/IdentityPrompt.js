// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Avatar from 'components/common/Avatar'
import Identity from 'models/Identity'
import { Field, reduxForm } from 'redux-form'
import { a11yButton } from 'utils/accessibility'
import { renderTextField } from 'utils/forms'
import Error from 'components/Error'
import classNames from 'classnames'

export const formName = 'IdentityPrompt'

class IdentityPrompt extends Component {

  props: {
    identity: Identity,
    open: boolean,
    onNameClick: () => any,
    handleSubmit: (Array) => any,
    onPasswordBlur: () => any,
  }

  render() {
    const { classes, identity, open, error, onNameClick, handleSubmit, onPasswordBlur } = this.props

    const passwordClasses = classNames(classes.password, {
      [classes.passwordClosed]: !open,
      [classes.passwordOpened]: open,
    })

    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.passwordWrapper}>

          <div className={classes.identity} { ...a11yButton(onNameClick) }>
            <Avatar person={identity} />
            <Typography type="subheading" noWrap>{identity.identity}</Typography>
          </div>

          <div className={passwordClasses}>
            { open && (
              <Field name='password'
                     component={renderTextField}
                     /* required */ fullWidth autoFocus
                     type='password'
                     onBlur={onPasswordBlur}
               />
            )}
          </div>
        </div>

        { (open && error) && <Error className={classes.error}>{error}</Error> }
      </form>
    )
  }
}

const validate = (values, props) => {
  const errors = {}

  // if(!values['password']) {
  //   errors['password'] = 'Required'
  // }

  return errors
}

const withForm = reduxForm({
  form: formName,
  validate,
})(IdentityPrompt)

const style = theme => ({
  identity: {
    width: 300,
    height: 42,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid',
    borderRadius: 20,
    margin: '-1px -1px',
    cursor: 'pointer',
    backgroundColor: theme.palette.background.light,
    borderColor: theme.palette.grey[500],
    flexGrow: 1,
    overflow: 'auto',

    '& > :last-child': {
      marginLeft: 10,
      userSelect: 'none',
    },
  },
  passwordWrapper: {
    display: 'flex',
    width: 300,
    height: 42,
    border: '1px solid',
    borderRadius: 20,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.main,
    borderColor: theme.palette.grey[500],
    marginBottom: 5,
  },
  password: {
    transition: 'padding 225ms, flex-grow 225ms, width 225ms',
  },
  passwordClosed: {
    padding: '0 0 2px',
    flexGrow: 1,
    width: 0,
  },
  passwordOpened: {
    padding: '0 16px 2px',
    flexGrow: 1,
    width: 300,
  },
  error: {
    marginBottom: '10px !important',
  },
})

export default withStyles(style)(withForm)
