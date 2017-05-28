// @flow
import randToken from 'rand-token'

const generator = randToken.generator()

export function nextToken(length: number = 32) {
  return generator.generate(length)
}
