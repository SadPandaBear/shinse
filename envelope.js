function Envelope({ envelope, dispatch, index }) {
  const id = `envelope-${index}`
  const width = 122
  const height = width / 2
  const xlmns = "http://www.w3.org/2000/svg"
  const baseProfile = "full"

  const $elem = document.createElementNS(xlmns, "svg")
  $elem.setAttributeNS(null, "width", width)
  $elem.setAttributeNS(null, "height", height)
  $elem.setAttributeNS(null, "baseProfile", height)

  const { a, d, s, r } = envelope

  const wRatio = width / 4
  const hRatio = height / 1

  const paths = []
  let x = 0
  let y = 0

  x = a * wRatio
  y = 0
  paths.push(`${x} ${y}`)

  x += d * wRatio
  y = height - s * hRatio
  paths.push(`${x} ${y}`)

  x += 1 * wRatio
  paths.push(`${x} ${y}`)

  x += r * wRatio
  y = height
  paths.push(`${x} ${y}`)

  const path = `M0 ${height},${paths.join(",")}`

  $elem.innerHTML = `<path d="${path}" stroke="white" stroke-width="2" fill="none"></path>`

  return $elem
}
