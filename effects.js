const Effects = (state, context) => {
  const play = () => {
    context.resume()
    state.playing = true
  }

  const stop = () => {
    context.suspend()
    state.playing = false
  }

  const playOscillator = () => {
    state.oscillator.node = createOscillator(context, {
      oscillator: state.oscillator,
      masterGainNode: state.masterGainNode,
    })
    state.oscillator.node.start()
  }

  const stopOscillator = () => {
    state.oscillator.node.stop(0)
    state.oscillator.node = null
  }

  return {
    playOscillator,
    stopOscillator,
    play,
    stop,
  }
}
