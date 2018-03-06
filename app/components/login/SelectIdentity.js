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
    active: ?Identity,
    open: boolean,
    onNameClick: (identity: Identity) => any,
    onSubmit: (identity: Identity) => any,
  }

  render() {
    const { classes, active, open } = this.props
    const identities = this.props.identities.identities

    return (
      <div className={classes.wrapper}>

        { identities.valueSeq().map((id: Identity) =>
          <IdentityPrompt
            key={id.storageKey}
            identity={id}
            active={id === active}
            open={open}
            onNameClick={() => this.props.onNameClick(id)}
            onSubmit={this.props.onSubmit}
          />
        )}

        <div className={classes.newIdentity} { ...a11yButton(::this.props.onNewIdentityClick) }>
          <Typography variant="subheading">Create a new identity</Typography>
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
    backgroundColor: theme.palette.background.light,
    borderColor: theme.palette.grey[500],

    justifyContent: 'center',
    userSelect: 'none',
  }
})

export default withStyles(style)(SelectIdentity)
