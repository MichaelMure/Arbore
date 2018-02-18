// @flow
import React, { Component } from 'react'
import styles from './NewProfile.css'
import Button from 'material-ui/Button'
import { FormLabel } from 'material-ui/Form'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from 'utils/forms'
import AvatarEditor from 'components/common/AvatarEditor'
import FontAwesome from 'react-fontawesome'
import Error from 'components/Error'

class NewProfile extends Component {
  avatarEditor: AvatarEditor

  props: {
    forbiddenIdentities: string[],
    onCancelClick: () => any,
    onSubmit: (values: {}) => any,
    waiting: boolean
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
    return this.props.onSubmit({
      identity: values.identity,
      password: values.password || '',
      bio: values.bio || '',
      avatar: this.avatarEditor.getImage()
    })
  }

  render() {
    const { error, handleSubmit, pristine, submitting, waiting } = this.props
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit(::this.handleSubmit)}>
        <div className={styles.row} >
          <div className={styles.column} >
            <FormLabel>Avatar</FormLabel>
            <AvatarEditor innerRef={(avatarEditor) => { if(avatarEditor) { this.avatarEditor = avatarEditor }}} />
          </div>
          <div className={styles.column}>
            <Field name='identity' component={renderTextField} required label='Identity'/>
            <Field name='password' component={renderTextField} required label='password' type='password'/>
            <Field name='password2' component={renderTextField} required label='Repeat password' type='password'/>
            <Field name='bio' component={renderTextField} label='About you (optional)' multiline rows="4" placeholder='Who are you ?'/>
          </div>
        </div>

        { error && <Error>{error}</Error>}

        <div className={styles.buttons}>
          <Button raised onClick={this.props.onCancelClick} disabled={waiting}>Cancel</Button>
          <Button raised color='primary' type='submit' disabled={pristine || submitting || waiting}>
            { waiting && <FontAwesome name='cog' spin /> }
            Create identity
          </Button>
        </div>
      </form>
    )
  }
}

const validate = (values, props) => {
  const errors = {}

  const requiredFields = [ 'identity', 'password', 'password2' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  if(values.password !== values.password2) {
    errors['password2'] = 'Both passwords should match'
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

