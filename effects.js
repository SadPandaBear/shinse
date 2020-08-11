const Effects = (state) => (context) => {
  context.suspend()

  const setupOscillators = () => {
    state.oscillators = state.oscillators.map((o) => {
      const analyser = context.createAnalyser()
      return { ...o, gain: createGain(context, analyser), analyser }
    })
  }

  const drawOscilloscope = (analyser, i) => {
    const oscilloscope = Oscilloscope(analyser, i)
    oscilloscope.init()
  }

  const play = () => {
    context.resume()
    state.playing = true
  }

  const stop = () => {
    context.suspend()
    state.playing = false
  }

  const playOscillator = (i) => {
    state.oscillators[i].node = createOscillator(context, state.oscillators[i])
    state.oscillators[i].node.start()
  }

  const stopOscillator = (i) => {
    state.oscillators[i].node.stop(0)
    state.oscillators[i].node = null
  }

  const render = () => {
    const oscillators = document.getElementById("oscillators")

    state.oscillators.forEach((oscillator, i) => {
      const elem = document.createElement("input")
      elem.type = "checkbox"
      drawOscilloscope(oscillator.analyser, i)
      elem.addEventListener("change", function (e) {
        if (e.target.checked) {
          playOscillator(i)
        } else {
          stopOscillator(i)
        }
      })
      oscillators.insertAdjacentElement("beforeend", elem)
    })
  }

  const addOscillator = () => {
    state.oscillators.push(initialOscillator)
    const i = state.oscillators.length - 1
    setupOscillators()
    state.oscillators[i].node = createOscillator(context, state.oscillators[i])
    render()
  }

  const init = () => {
    setupOscillators()
    render()
  }

  return {
    init,
    render,
    addOscillator,
    playOscillator,
    stopOscillator,
    play,
    stop,
    state,
  }
}
