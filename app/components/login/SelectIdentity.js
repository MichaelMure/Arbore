// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import IdentityPrompt from 'containers/login/IdentityPrompt'
import IdentityList from 'models/IdentityList'
import Identity from 'models/Identity'
import { a11yButton } from 'utils/accessibility'

class SelectIdentity extends Component {

  props: {
    identities: IdentityList,
    onNewIdentityClick: () => any,
    onIdentityOpen: (identity: Identity) => any,
    opened: ?Identity
  }

  render() {
    const { classes, onIdentityOpen, opened, onFinish } = this.props
    const identities = this.props.identities.identities

    return (
      <div className={classes.wrapper}>

        { identities.valueSeq().map((id: Identity) =>
          <IdentityPrompt
            key={id.storageKey}
            identity={id}
            open={id === opened}
            onNameClick={() => onIdentityOpen(id)}
            onFinish={onFinish}
          />
        )}

        <div className={classes.newIdentity} { ...a11yButton(::this.props.onNewIdentityClick) }>
          <Typography type="subheading">Create a new identity</Typography>
        </div>
      </div>
    )
  }
}

const style = theme => ({
  wrapper: {
    maxHeight: 500,
    overflowY: 'auto',
  },
  newIdentity: {
    width: 300,
    height: 42,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid',
    borderRadius: 20,
    marginBottom: 5,
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.grey[500],

    justifyContent: 'center',
    userSelect: 'none',
  }
})

export default withStyles(style)(SelectIdentity)
