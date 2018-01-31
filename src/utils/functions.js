export const formatNumber = value => {
  if (isNaN(value)) {
    return false
  } else {
    let nStr = String(Math.round(value, 2))
    nStr += ''
    let x = nStr.split('.')
    let x1 = x[0]
    let x2 = x.length > 1 ? '.' + x[1] : ''
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ' ' + '$2')
    }
    return x1 + x2
  }
}