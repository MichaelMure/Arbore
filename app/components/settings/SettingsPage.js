// @flow
import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Settings, { Theme } from 'models/Settings'
import SecondaryMenu from 'containers/menu/SecondaryMenu'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form'
import type { ThemeType } from 'models/Settings'

class SettingsPage extends Component {

  props: {
    settings: Settings,
    onThemeChange: (any, ThemeType) => void,
    onDirectoryPrivacyChange: (any, string) => void,
    onAutoAddContactBackChange: (any, string) => void,
  }

  render() {
    const {
      classes,
      onThemeChange,
      onDirectoryPrivacyChange,
      onAutoAddContactBackChange,
    } = this.props
    const settings: Settings = this.props.settings

    return (
      <div className={classes.wrapper}>
        <div className={classes.empty}/>
        <SecondaryMenu />

        <div className={classes.settings}>
          <FormControl>
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

          <FormControl>
            <FormLabel>Privacy</FormLabel>
            <FormHelperText>To help your contacts to find new people easily, Arbore will share your directory with them (and only them).
              You can completely block sharing here.</FormHelperText>
            <RadioGroup
              aria-label='privacy'
              name='privacy'
              value={settings.directoryPrivacy ? 'true' : 'false'}
              onChange={onDirectoryPrivacyChange}
            >
              <FormControlLabel value={'false'} control={<Radio />} label='Visible' />
              <FormControlLabel value={'true'} control={<Radio />} label='Hidden' />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Contacts</FormLabel>
            <FormHelperText>Automatically add a contact in your directory when they add you.</FormHelperText>
            <RadioGroup
              aria-label='autoAddContactBack'
              name='autoAddContactBack'
              value={settings.autoAddContactBack ? 'true' : 'false'}
              onChange={onAutoAddContactBackChange}
            >
              <FormControlLabel value={'true'} control={<Radio />} label='Active' />
              <FormControlLabel value={'false'} control={<Radio />} label='Disabled' />
            </RadioGroup>
          </FormControl>
        </div>
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
    height: '100%',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    padding: 30,
    '&>*': {
      padding: 10,
      width: 300,
      minWidth: 300,
    }
  },
})

export default withStyles(style)(SettingsPage)
