// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import type { Action, Store } from 'utils/types'
import EditProfile from 'components/profile/EditProfile'
import * as profile from 'actions/profile'
import { AVATAR_DELETED } from 'components/common/AvatarEditor'
import { isBuffer } from 'util'
import { SubmissionError } from 'redux-form'

// This is a bit hacky but looks good (better than a textfield placeholder)
const passwordPlaceholder = 'ⓟⓛⓐⓒⓔⓗⓞⓛⓓⓔⓡ'

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
    const { bio, avatar, password } = values

    this.setState({ waiting: true })

    try {
      await dispatch(profile.setBio(bio))

      if(avatar === AVATAR_DELETED) {
        await dispatch(profile.deleteAvatar())
      } else if (isBuffer(avatar)) {
        await dispatch(profile.updateAvatar(avatar))
      }

      if(password !== passwordPlaceholder) {
        await dispatch(profile.updatePassword(password))
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
    password: passwordPlaceholder,
    password2: passwordPlaceholder
  }
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer)
