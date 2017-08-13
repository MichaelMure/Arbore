// @flow
import React, { Component } from 'react'
import styles from './EditProfile.css'
import Button from 'material-ui/Button'
import { FormLabel } from 'material-ui/Form'
import AvatarEditor from 'components/common/AvatarEditor'
import { renderTextField } from 'utils/forms'
import { Field, reduxForm } from 'redux-form'
import FontAwesome from 'react-fontawesome'
import Error from 'components/Error'

class EditProfile extends Component {
  avatarEditor: AvatarEditor

  props : {
    onCancelClick: () => any,
    onSubmit: (values: {}) => any,
    waiting: boolean,
    initialValues: {}
  }

  // Intercept the submit to clean the values and add the avatar
  handleSubmit(values) {
    // Pass it up ↑
    return this.props.onSubmit({
      passphrase: values.passphrase|| '',
      bio: values.bio || '',
      avatar: this.avatarEditor.getImage()
    })
  }

  handlePristineChanged() {
    this.forceUpdate()
  }

  render() {
    const { error, onCancelClick, handleSubmit, pristine, submitting, waiting } = this.props
    const avatarPristine = !this.avatarEditor || this.avatarEditor.pristine

    return (
      <form onSubmit={handleSubmit(::this.handleSubmit)}>
        <FormLabel>Avatar</FormLabel>
        <div className={styles.avatarEditor}>
          <AvatarEditor
            innerRef={(avatarEditor) => { if(avatarEditor) { this.avatarEditor = avatarEditor }}}
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
        <Field name='bio' component={renderTextField} label='Bio' multiline rows='6' placeholder='Who are you ?'/>

        { error && <Error>{error}</Error>}

        <div className={styles.buttons}>
          <Button raised onClick={onCancelClick} disabled={waiting}>Cancel</Button>
          <Button
            raised color='primary'
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

