const Effects = (state, context) => {
  const play = () => {
    context.resume()
    state.playing = true
  }

  const stop = () => {
    context.suspend()
    state.playing = false
  }

  const playOscillator = (i) => {
    state.oscillators[i].node = createOscillator(context, {
      oscillator: state.oscillators[i],
      masterGainNode: state.masterGainNode,
    })
    state.oscillators[i].node.start()
  }

  const stopOscillator = (i) => {
    state.oscillators[i].node.stop(0)
    state.oscillators[i].node = null
  }

  return {
    playOscillator,
    stopOscillator,
    play,
    stop,
  }
}
