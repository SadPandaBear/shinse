function Oscilloscope({ index, analyser }) {
  const $elem = document.createElement("canvas")
  $elem.id = `oscillator-${index}`
  const canvasContext = $elem.getContext("2d")

  $elem.width = 512
  WIDTH = $elem.width
  HEIGHT = $elem.height

  const bufferLength = analyser.fftSize
  const dataArray = new Uint8Array(bufferLength)
  const sliceWidth = (WIDTH * 1.0) / bufferLength

  function draw() {
    requestAnimationFrame(draw)
    analyser.getByteTimeDomainData(dataArray)

    canvasContext.fillStyle = "black"
    canvasContext.fillRect(0, 0, WIDTH, HEIGHT)
    canvasContext.lineWidth = 2
    canvasContext.strokeStyle = "white"
    canvasContext.beginPath()

    let x = 0
    dataArray.forEach((d, i) => {
      const v = d / 128.0
      const y = (v * HEIGHT) / 2

      if (i === 0) {
        canvasContext.moveTo(x, y)
      } else {
        canvasContext.lineTo(x, y)
      }

      x += sliceWidth
    })

    canvasContext.lineTo($elem.width, $elem.height / 2)
    canvasContext.stroke()
  }

  canvasContext.clearRect(0, 0, WIDTH, HEIGHT)
  draw()
  return $elem
}
