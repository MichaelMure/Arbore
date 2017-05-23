// @flow
import randToken from 'rand-token'

const generator = randToken.generator()

export function nextToken() {
  return generator.generate(32)
}
