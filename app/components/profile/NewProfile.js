// @flow
import React, { Component } from 'react'
import styles from './NewProfile.css'
import { Button, FormLabel, Text, TextField } from 'material-ui'
import AvatarEditor from 'components/profile/AvatarEditor'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'identity', 'lastName', 'email', 'favoriteColor', 'notes' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}

class NewProfile extends Component {

  props: {
    onCancelClick: () => any
  }

  validate() {

  }

  handleSubmit(e) {
    e.preventDefault()
    console.log(e)
  }

  render() {
    return (
      <form className={styles.wrapper} onSubmit={::this.handleSubmit}>
        <div className={styles.row} >
          <div className={styles.column} >
            <FormLabel >Avatar</FormLabel>
            <AvatarEditor/>
          </div>
          <div className={styles.column}>
            <TextField name='identity' required label='Identity'/>
            <TextField name='passphrase' required label='Passphrase' type='password'/>
            <TextField name='passphrase2' required label='Repeat passphrase' type='password'/>
            <TextField name='bio' label='Bio'/>
          </div>
        </div>

        <Text>Warning: Your data nor your profile is protected for now.
          The passphrase is here for compatibility for when this features will be available.</Text>

        <div className={styles.buttons}>
          <Button raised onClick={this.props.onCancelClick }>Cancel</Button>
          <Button raised primary type='submit'>Submit</Button>
        </div>
      </form>
    )
  }
}

export default NewProfile
