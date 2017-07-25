// @flow
import React, { Component } from 'react'
import styles from './AddByPubkey.css'
import Button from 'material-ui/Button'
import { Field, reduxForm } from 'redux-form'
import { renderTextField } from 'utils/forms'
import FontAwesome from 'react-fontawesome'
import Error from 'components/Error'

class AddByPubkey extends Component {

  props: {
    waiting: boolean,
    onCancelClick: () => any,
    handleSubmit: (Array) => any
  }

  render() {
    const { error, pristine, submitting, waiting, handleSubmit } = this.props
    return (
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <Field name='pubkey' component={renderTextField} required label='Contact'/>

        { error && <Error>{error}</Error>}

        <div className={styles.buttons}>
          <Button raised onClick={this.props.onCancelClick} disabled={waiting}>Cancel</Button>
          <Button raised color='primary' type='submit' disabled={pristine || submitting || waiting}>
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

  if (!values[ 'pubkey' ]) {
    errors[ 'pubkey' ] = 'Required'
  }

  return errors
}

export default reduxForm({
  form: 'AddByPubkey',
  validate,
})(AddByPubkey)

