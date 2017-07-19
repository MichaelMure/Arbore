// @flow
import React, { Component } from 'react'
import styles from './NewShare.css'
import Button from 'material-ui/Button'
import { LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from 'utils/forms'
import ContactList from 'models/ContactList'
import RecipientsInput from 'components/sharing/RecipientsInput'
import ContentInput from 'components/sharing/ContentInput'
import FontAwesome from 'react-fontawesome'
import Error from 'components/Error'

export const formName = 'NewShareForm'

class NewShare extends Component {

  props: {
    contactList: ContactList,
    onCancelClick: () => any,
    onSubmit: (values: {}) => any,
    progress: any
  }

  render() {
    const { contactList, error, progress, handleSubmit, pristine, submitting, waiting } = this.props

    return (
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <Field name='title' component={renderTextField} required label='Title' autoFocus />
        <Field name='description' component={renderTextField} multiline rows="6" label='Description'/>
        <Field name='recipients' component={RecipientsInput} contactList={contactList} label="Recipients"/>
        <Field name='content' component={ContentInput} label='Content'/>

        { error && <Error>{error}</Error>}

        { progress &&
          <div className={styles.progressWrapper}>
            <LinearProgress mode="buffer" value={progress.progress*100} valueBuffer={progress.nextProgress*100} />
            <Typography>Adding {progress.adding}</Typography>
          </div>
        }

        <div className={styles.buttons}>
          <Button raised onClick={this.props.onCancelClick} disabled={waiting}>Cancel</Button>
          <Button raised color='primary' type='submit' disabled={pristine || submitting }>
            { submitting && <FontAwesome name='cog' spin /> }
            Share
          </Button>
        </div>
      </form>
    )
  }
}

const validate = (values, props) => {
  const errors = {}

  const requiredFields = ['title']
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

  const recipients = values['recipients']
  if(!recipients || recipients.length === 0) {
    errors['recipients'] = 'Required'
  }

  const content = values['content']
  if(!content || content.length === 0) {
    errors['content'] = 'Required'
  }

  // detect a duplicate name
  if(content && content.length !== new Set(content).size) {
    errors['content'] = 'Duplicate name'
  }

  return errors
}

export default reduxForm({
  form: formName,
  validate,
})(NewShare)
