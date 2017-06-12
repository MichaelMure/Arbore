// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { Action, Store } from 'utils/types'
import EditProfile from 'components/profile/EditProfile'
import * as profile from 'actions/profile'
import { AVATAR_DELETED } from 'components/profile/AvatarEditor'
import { isBuffer } from 'util'
import { SubmissionError } from 'redux-form'

// TODO: this could be done best with a real placeholder in the textfield
const passphrasePlaceholder = 'ⓟⓛⓐⓒⓔⓗⓞⓛⓓⓔⓡ'

/**
 * Container around the edit Profile form
 */
class EditProfileContainer extends Component {
  editProfile: EditProfile

  state = {
    waiting: false
  }

  props: {
    dispatch: (Action) => any,
    onCancelClick: () => any,
    onDone: () => any,
  }

  async handleSubmit(values) {
    const dispatch = this.props.dispatch
    const { bio, avatar, passphrase } = values

    this.setState({ waiting: true })

    try {
      await dispatch(profile.setBio(bio))

      if(avatar === AVATAR_DELETED) {
        await dispatch(profile.deleteAvatar())
      } else if (isBuffer(avatar)) {
        await dispatch(profile.updateAvatar(avatar))
      }

      if(passphrase !== passphrasePlaceholder) {
        await dispatch(profile.updatePassphrase(passphrase))
      }

      this.setState({ waiting: false })
      this.props.onDone()
    } catch(err) {
      this.setState({ waiting: false })
      throw new SubmissionError({ _error: err })
    }
  }

  render() {
    return (
      <EditProfile
        ref={(editProfile) => { this.editProfile = editProfile }}
        onSubmit={::this.handleSubmit}
        waiting={this.state.waiting}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = (state: Store) => ({
  initialValues: {
    bio: state.profile.bio,
    avatar: state.profile.avatarUrl,
    passphrase: passphrasePlaceholder,
    passphrase2: passphrasePlaceholder
  }
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer)
