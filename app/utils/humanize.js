// @flow

// Extracted from https://github.com/aldipower/humanize/ and reworked to
// allow formating filesize without the unit

export const filesizeNoUnit = (size, kilo, decimals, decPoint, thousandsSep) => (
  filesize(size, kilo, decimals, decPoint, thousandsSep, '', ['', '', '', '', '', ''])
)
/**
 * Formats the value like a 'human-readable' file size (i.e. '13 KB', '4.1 MB', '102 bytes', etc).
 *
 * For example:
 * If value is 123456789, the output would be 117.7 MB.
 */
export const filesize = (filesize, kilo, decimals, decPoint, thousandsSep, suffixSep, units) => {
  units = units || ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB']
  kilo = (kilo === undefined) ? 1024 : kilo
  if (filesize < kilo && decimals === undefined) {
    decimals = 0
  }
  if (suffixSep === undefined) {
    suffixSep = ' '
  }
  if (filesize <= 0.5) {
    return '0' + suffixSep + units[0]
  }
  return intword(filesize, units, kilo, decimals, decPoint, thousandsSep, suffixSep)
}

/**
 * Formats the value like a 'human-readable' number (i.e. '13 K', '4.1 M', '102', etc).
 *
 * For example:
 * If value is 123456789, the output would be 117.7 M.
 */
export const intword = (number, units, kilo, decimals, decPoint, thousandsSep, suffixSep) => {
  let unit

  units = units || ['', 'K', 'M', 'B', 'T']
  unit = units.length - 1
  kilo = kilo || 1000
  decimals = isNaN(decimals) ? 2 : Math.abs(decimals)
  decPoint = decPoint || '.'
  thousandsSep = thousandsSep || ','
  suffixSep = suffixSep || ''

  for (let i = 0; i < units.length; i++) {
    if (number < Math.pow(kilo, i + 1)) {
      unit = i
      break
    }
  }
  const humanized = number / Math.pow(kilo, unit)

  const suffix = units[unit] ? suffixSep + units[unit] : ''
  return numberFormat(humanized, decimals, decPoint, thousandsSep) + suffix
}

/**
 * format number by adding thousands separaters and significant digits while rounding
 */
export const numberFormat = (number, decimals, decPoint, thousandsSep) => {
  decimals = isNaN(decimals) ? 2 : Math.abs(decimals)
  decPoint = (decPoint === undefined) ? '.' : decPoint
  thousandsSep = (thousandsSep === undefined) ? ',' : thousandsSep

  const sign = number < 0 ? '-' : ''
  number = Math.abs(+number || 0)

  const intPart = parseInt(number.toFixed(decimals), 10) + ''
  const j = intPart.length > 3 ? intPart.length % 3 : 0

  return sign
    + (j ? intPart.substr(0, j) + thousandsSep : '')
    + intPart.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSep)
    + (decimals ? decPoint + Math.abs(number - intPart).toFixed(decimals).slice(2) : '')
}
