// @flow

/**
 * Helper to find if a string contains a pattern (case insensitive).
 * Handle the null string case.
 */
export default function strContain(str : ?string, pattern : string) : boolean {
  return (!!str) && (str.search(new RegExp(pattern, 'i')) !== -1)
}
