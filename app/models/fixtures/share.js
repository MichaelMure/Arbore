import Share, { writable } from 'models/Share'
import contactFxt from './contact'
import d2, { webui } from './ipfsDirectory'
import randomName from 'utils/randomName'

const shares = [
  Share.create(contactFxt[0], 'title'),
  Share.create(contactFxt[1], 'Share Title', 'Share description. Like a very long text with some HIuuuuuUUuuugge words. THe better words evar.'),
  Share.create(contactFxt[2], 'title', 'Moderately long description'),
  Share.create(contactFxt[3], 'title', 'Sometimes this results in clearer code, but this style can also be abused. Like in JavaScript, it is up to you to decide whether it is worth extracting a variable for readability. Keep in mind that if the map() body is too nested, it might be a good time to extract a component.'),
  Share.create(contactFxt[0], 'title'),
  Share.create(contactFxt[1], 'Share Title', 'Share description. Like a very long text with some HIuuuuuUUuuugge words. THe better words evar.'),
  Share.create(contactFxt[2], 'title', 'Moderately long description'),
  Share.create(contactFxt[3], 'title', 'Sometimes this results in clearer code, but this style can also be abused. Like in JavaScript, it is up to you to decide whether it is worth extracting a variable for readability. Keep in mind that if the map() body is too nested, it might be a good time to extract a component.'),
]

shares[0] = shares[0].set(writable.content, shares[0].content.set(randomName(), webui))
shares[1] = shares[1].set(writable.content, shares[1].content.set(randomName(), d2))
// shares[2] = shares[2].set(writable.content, shares[2].content.set(randomName(), webui))
// shares[3] = shares[3].set(writable.content, shares[3].content.set(randomName(), webui))
// shares[4] = shares[4].set(writable.content, shares[4].content.set(randomName(), webui))
// shares[5] = shares[5].set(writable.content, shares[5].content.set(randomName(), webui))
// shares[6] = shares[6].set(writable.content, shares[6].content.set(randomName(), webui))

export default shares
