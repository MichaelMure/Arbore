// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Settings, { Theme } from 'models/Settings'
import SecondaryMenu from 'containers/menu/SecondaryMenu'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form'
import type { ThemeType } from 'models/Settings'

class SettingsPage extends Component {

  props: {
    settings: Settings,
    onThemeChange: (any, ThemeType) => void,
  }

  render() {
    const { classes, onThemeChange } = this.props
    const settings: Settings = this.props.settings

    return (
      <div className={classes.wrapper}>
        <div className={classes.empty}/>
        <SecondaryMenu />

        <FormControl className={classes.settings}>
          <FormLabel>Theme</FormLabel>
          <RadioGroup
            aria-label='theme'
            name='theme'
            value={settings.theme}
            onChange={onThemeChange}
          >
            <FormControlLabel value={Theme.LIGHT} control={<Radio />} label='Light' />
            <FormControlLabel value={Theme.DARK} control={<Radio />} label='Dark' />
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}

const style = theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gridTemplateRows: 'auto 1fr',
    height: '100vh',
    backgroundColor: theme.palette.background.dark,
  },
  empty: {
    backgroundColor: theme.palette.background.dark,
  },
  settings: {
    backgroundColor: theme.palette.background.main,
    gridColumn: '1 / 3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
})

export default withStyles(style)(SettingsPage)
