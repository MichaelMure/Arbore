import * as ipfs from './ipfs/ipfsMonoProcess'
import { waitForIpfsReady } from './ipfs/index'
import { getLoginStore, getFullStore } from 'store/index'
import * as profileActions from 'actions/profile'
import * as identityListActions from 'actions/identityList'
import IdentityList from 'models/IdentityList'
import Identity from 'models/Identity'
import Profile from 'models/Profile'

let fullStore = null

async function run() {
  console.log('Start IPFS')
  ipfs.start()
  await waitForIpfsReady()

  const loginStore = await getLoginStore()

  let identityList: IdentityList = loginStore.getState().identityList

  if(identityList.identities.count() <= 0) {
    console.log('Generate new profile ...')

    await loginStore.dispatch(
      profileActions.generate("Contact adder", 'blah', 'I\'m a bot! I help you to find other people.')
    )
  }

  identityList = loginStore.getState().identityList
  const identity: Identity = identityList.identities.first()
  console.log('Login with identity ' + identity.identity)

  await loginStore.dispatch(identityListActions.login(identity))

  fullStore = await getFullStore(identity.storageKey, 'contactAdder')

  const profile: Profile = fullStore.getState().profile
  console.log('##########################################################')
  console.log('# Pubkey: ' + profile.pubkey + ' #')
  console.log('##########################################################')
}

run()

// Exit code
let forceExit = false
process.on('SIGINT', async function() {
  console.log("Caught interrupt signal");

  if (!forceExit) {
    forceExit = true
    if(fullStore) {
      await fullStore.dispatch(identityListActions.logout())
    }
    ipfs.stop()
  } else {
    process.exit()
  }
})
