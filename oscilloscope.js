const Oscilloscope = (analyser, i) => {
  document
    .getElementById("app")
    .insertAdjacentHTML("beforeend", `<canvas id="canvas-${i}"></canvas>`)
  const canvas = document.getElementById(`canvas-${i}`)
  const canvasCtx = canvas.getContext("2d")

  canvas.width = 512
  WIDTH = canvas.width
  HEIGHT = canvas.height

  analyser.fftSize = 2048
  const bufferLength = analyser.fftSize
  const dataArray = new Uint8Array(bufferLength)
  const sliceWidth = (WIDTH * 1.0) / bufferLength

  const draw = function () {
    requestAnimationFrame(draw)
    analyser.getByteTimeDomainData(dataArray)

    canvasCtx.fillStyle = "black"
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)
    canvasCtx.lineWidth = 2
    canvasCtx.strokeStyle = "white"
    canvasCtx.beginPath()

    let x = 0
    dataArray.forEach((d, i) => {
      const v = d / 128.0
      const y = (v * HEIGHT) / 2

      if (i === 0) {
        canvasCtx.moveTo(x, y)
      } else {
        canvasCtx.lineTo(x, y)
      }

      x += sliceWidth
    })

    canvasCtx.lineTo(canvas.width, canvas.height / 2)
    canvasCtx.stroke()
  }

  const init = () => {
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
    draw()
  }

  return {
    init,
  }
}
