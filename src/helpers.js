/* helper function */

export function generateKey () {
  return `p${Date.now()}-${Math.floor(Math.random() * 10000)}`
}
