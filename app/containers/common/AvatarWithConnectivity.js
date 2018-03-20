import React, { Component } from 'react'
import { connect } from 'react-redux'
import AvatarWithConnectivity from 'components/common/AvatarWithConnectivity'
import Profile from 'models/Profile'
import * as ipfs from 'actions/ipfs'

class AvatarWithConnectivityContainer extends Component {

  props: {
    profile: Profile,
    dispatch: any
  }

  constructor(props) {
    super(props)
    this.state = {
      swarmCount: null
    }
  }

  async handleMouseEnter() {
    const swarmCount = await this.props.dispatch(ipfs.getSwarmCount())
    this.setState({ swarmCount: swarmCount })
  }

  render() {
    return (
      <AvatarWithConnectivity
        profile={this.props.profile}
        swarmCount={this.state.swarmCount}
        onMouseEnter={::this.handleMouseEnter}
      />
    )
  }
}

export default connect()(AvatarWithConnectivityContainer)
