// @flow
import React, { Component } from 'react'
import styles from './NewProfile.css'
import { Field, reduxForm } from 'redux-form'
import { Button, FormLabel, Typography } from 'material-ui'
import { renderTextField } from 'utils/forms'
import AvatarEditor from 'components/profile/AvatarEditor'
import FontAwesome from 'react-fontawesome'

class NewProfile extends Component {
  avatarEditor: AvatarEditor

  props: {
    forbiddenIdentities: string[],
    onCancelClick: () => any,
    onSubmit: (values: {}) => any,
    waiting: boolean,
    error: ?string
  }

  reset() {
    if(this.props) {
      this.props.reset()
    }
    if(this.avatarEditor) {
      this.avatarEditor.reset()
    }
  }

  // Intercept the submit to clean the values and add the avatar
  handleSubmit(values) {
    // Pass it up ↑
    this.props.onSubmit({
      identity: values.identity,
      passphrase: values.passphrase|| '',
      bio: values.bio || '',
      avatar: this.avatarEditor.getPngImage()
    })
  }

  // TODO: need an error field
  render() {
    const { handleSubmit, pristine, submitting, waiting } = this.props
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit(::this.handleSubmit)}>
        <div className={styles.row} >
          <div className={styles.column} >
            <FormLabel>Avatar</FormLabel>
            <AvatarEditor ref={(avatarEditor) => { this.avatarEditor = avatarEditor }} />
          </div>
          <div className={styles.column}>
            <Field name='identity' component={renderTextField} required label='Identity'/>
            <Field name='passphrase' component={renderTextField} required label='Passphrase' type='password'/>
            <Field name='passphrase2' component={renderTextField} required label='Repeat passphrase' type='password'/>
            <Field name='bio' component={renderTextField} label='Bio'/>
          </div>
        </div>

        <Typography>Warning: Neither your data nor your local profile is protected for now.</Typography>

        <div className={styles.buttons}>
          <Button raised onClick={this.props.onCancelClick} disabled={waiting}>Cancel</Button>
          <Button raised primary type='submit' disabled={pristine || submitting || waiting}>
            { waiting && <FontAwesome name='cog' spin /> }
            Submit
          </Button>
        </div>
      </form>
    )
  }
}

const validate = (values, props) => {
  const errors = {}

  const requiredFields = [ 'identity', 'passphrase', 'passphrase2' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  if(values.passphrase !== values.passphrase2) {
    errors['passphrase2'] = 'Both passphrases should be equals'
  }

  if(props.forbiddenIdentities.includes(values.identity)) {
    errors['identity'] = 'This identity already exist'
  }

  return errors
}

export default reduxForm({
  form: 'NewProfileForm',
  validate,
})(NewProfile)

