// @flow
import { connect } from 'react-redux'
import { Store } from 'utils/types'
import SettingsPage from 'components/settings/SettingsPage'
import * as settings from 'actions/settings'
import { getLoginStore } from 'store/index'

const mapStateToProps = (state: Store) => ({
  settings: state.settings
})

const mapDispatchToProps = dispatch => ({
  onThemeChange: async (event, value) => {
    const action = settings.setTheme(value)

    // Dispatch the action in both redux store
    dispatch(action)

    const loginStore = await getLoginStore()
    loginStore.dispatch(action)
  },
  onDirectoryPrivacyChange: (event, value: string) => {
    dispatch(settings.setDirectoryPrivacy(value === 'true'))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
