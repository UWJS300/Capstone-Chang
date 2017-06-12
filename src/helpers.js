/* helper function */

export function generateKey () {
  let randomText = ''
  const alphaNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for ( let i=0; i < 10; i++ ) {
    randomText += alphaNum.charAt(Math.floor(Math.random() * alphaNum.length))
  }
  return `s${Date.now()}_${randomText}`
}

export function addHyphen (str) {
  str = str.replace(/\s+/g, '-')
  return str
}

export function removeHyphen (str) {
  str = str.replace(/-/g, ' ')
  return str
}
