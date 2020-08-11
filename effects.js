const Effects = (state) => (context) => {
  context.suspend()

  const setupOscillators = () => {
    state.oscillators = state.oscillators.map((o) => {
      const analyser = context.createAnalyser()
      return { ...o, gain: createGain(context, analyser), analyser }
    })
  }

  const drawOscilloscope = () => {
    state.oscillators.forEach((e, i) => {
      const oscilloscope = Oscilloscope(e.analyser, i)
      oscilloscope.init()
    })
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

  const addOscillator = () => {
    state.oscillators.push(initialOscillator)
    const i = state.oscillators.length - 1
    setupOscillators()
    drawOscilloscope()
    state.oscillators[i].node = createOscillator(context, state.oscillators[i])
  }

  const init = () => {
    setupOscillators()
    drawOscilloscope()
  }

  return {
    init,
    addOscillator,
    playOscillator,
    stopOscillator,
    play,
    stop,
    state,
  }
}
