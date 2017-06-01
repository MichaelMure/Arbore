// @flow
import React, { Component } from 'react'
import styles from './NewShare.css'
import Button from 'material-ui/Button'
import { FormControl, FormLabel } from 'material-ui/Form'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from 'utils/forms'
import ContactList from 'models/ContactList'
import RecipientsInput from 'components/sharing/RecipientsInput'

export const formName = 'NewShareForm'

class NewShare extends Component {
  recipients: RecipientsInput

  props: {
    contactList: ContactList,
    onCancelClick: () => any,
    onSubmit: (values: {}) => any,
    waiting: boolean
  }

  render() {
    const { contactList, handleSubmit, pristine, submitting, waiting } = this.props

    return (
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <Field name='title' component={renderTextField} required label='Title' autoFocus />
        <Field name='description' component={renderTextField} multiline rows="6" label='Description'/>
        <Field name="recipients" component={RecipientsInput} contactList={contactList} label="Recipients"/>

        <FormControl style={{ marginTop: '10px' }}>
          <FormLabel>Content</FormLabel>
          <div className={styles.content}>

          </div>
        </FormControl>

        <div className={styles.buttons}>
          <Button raised onClick={this.props.onCancelClick} disabled={waiting}>Cancel</Button>
          <Button raised primary type='submit' disabled={pristine || submitting || waiting}>
            { waiting && <FontAwesome name='cog' spin /> }
            Share
          </Button>
        </div>
      </form>
    )
  }
}

const validate = (values, props) => {
  const errors = {}

  const requiredFields = [ 'title' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  const recipients = values[ 'recipients' ]
  if(!recipients || recipients.length == 0) {
    errors[ 'recipients' ] = 'Required'
  }

  return errors
}

export default reduxForm({
  form: formName,
  validate,
})(NewShare)
