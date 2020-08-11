const Store = (state) => (context) => {
  context.suspend()

  const setupOscillators = () => {
    state.oscillators = state.oscillators.map((o) => {
      const analyser = context.createAnalyser()
      return { ...o, gain: createGain(context, analyser), analyser }
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
    state.oscillators[i].playing = true
  }

  const stopOscillator = (i) => {
    state.oscillators[i].node.stop(0)
    state.oscillators[i].node = null
    state.oscillators[i].playing = false
  }


  const addOscillator = () => {
    state.oscillators.push(initialOscillator)
    setupOscillators()
  }

  const init = () => {
    setupOscillators()
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
