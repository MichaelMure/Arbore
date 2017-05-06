// @flow
import React, { Component } from 'react'
import styles from './EditProfile.css'
import AvatarEditor from 'components/profile/AvatarEditor'
import { Button, FormLabel } from 'material-ui'
import { renderTextField } from 'utils/forms'
import { Field, reduxForm } from 'redux-form'
import FontAwesome from 'react-fontawesome'

class EditProfile extends Component {
  avatarEditor: AvatarEditor

  props : {
    onCancelClick: () => any,
    onSubmit: (values: {}) => any,
    waiting: boolean,
    error: ?string,
    initialValues: {}
  }

  // Intercept the submit to clean the values and add the avatar
  handleSubmit(values) {
    // Pass it up ↑
    this.props.onSubmit({
      passphrase: values.passphrase|| '',
      bio: values.bio || '',
      avatar: this.avatarEditor.getImage()
    })
  }

  handlePristineChanged() {
    this.forceUpdate()
  }

  render() {
    const { onCancelClick, handleSubmit, pristine, submitting, waiting } = this.props
    const avatarPristine = !this.avatarEditor || this.avatarEditor.pristine

    return (
      <form onSubmit={handleSubmit(::this.handleSubmit)}>
        <FormLabel>Avatar</FormLabel>
        <div className={styles.avatarEditor}>
          <AvatarEditor
            ref={(avatarEditor) => { this.avatarEditor = avatarEditor }}
            placeholder={this.props.initialValues.avatar}
            onPristineChanged={::this.handlePristineChanged}
          />
        </div>

        {/* TODO: passphrase values shoud be cleared on select && pristine*/}
        <Field
          name='passphrase'
          component={renderTextField}
          required
          label='Passphrase'
          type='password'
        />
        <Field
          name='passphrase2'
          component={renderTextField}
          required
          label='Repeat passphrase'
          type='password'
        />
        <Field name='bio' component={renderTextField} label='Bio'/>

        <div className={styles.buttons}>
          <Button raised onClick={onCancelClick} disabled={waiting}>Cancel</Button>
          <Button
            raised primary
            type='submit'
            disabled={(pristine && avatarPristine) || submitting || waiting}
          >
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

  const requiredFields = [ 'passphrase', 'passphrase2' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  if(values.passphrase !== values.passphrase2) {
    errors['passphrase2'] = 'Both passphrases should be equals'
  }

  return errors
}

export default reduxForm({
  form: 'EditProfileForm',
  validate,
})(EditProfile)

