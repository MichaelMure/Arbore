// @flow
import React, { Component } from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import IdentityList from 'models/IdentityList'
import Identity from 'models/Identity'
import Avatar from 'components/common/Avatar'

class SelectIdentity extends Component {

  props: {
    identities: IdentityList,
    onNewIdentityClick: () => any,
    onIdentityClickGenerator: (identity: Identity) => any,
  }

  renderIdentity(identity: Identity, onClick, classes) {
    return (
      <div key={identity.storageKey} className={classes.identity} onClick={onClick}>
        <Avatar person={identity} />
        <Typography type="subheading">{identity.identity}</Typography>
      </div>
    )
  }

  render() {
    const { classes } = this.props
    const identities = this.props.identities.identities

    return (
      <div className={classes.wrapper}>
        {
          identities.valueSeq().map((id: Identity) =>
            this.renderIdentity(id, this.props.onIdentityClickGenerator(id), classes)
          )
        }
        <div className={classes.newIdentity} onClick={ ::this.props.onNewIdentityClick }>
          <Typography type="subheading">Create a new identity</Typography>
        </div>
      </div>
    )
  }
}

const identity = {
  width: 300,
  height: 42,
  display: 'flex',
  alignItems: 'center',
  border: '1px solid',
  borderRadius: 20,
  marginBottom: 5,
  cursor: 'pointer',
};

const styleSheet = createStyleSheet('SelectIdentity', theme => ({
  wrapper: {
    maxHeight: 500,
    overflowY: 'auto',
  },
  identity: {
    extend: identity,
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.grey[500],
    '& > span': {
      margiLeft: 10,
      userSelect: 'none',
    }
  },
  newIdentity: {
    extend: identity,
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.grey[500],
    justifyContent: 'center',
    userSelect: 'none',
  }
}))

export default withStyles(styleSheet)(SelectIdentity)
