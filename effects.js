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
    state.oscillators[i] = createOscillator(context, state)
    state.oscillators[i].start()
  }

  const stopOscillator = (i) => {
    state.oscillators[i].stop(0)
    state.oscillators[i] = null
  }

  return {
    playOscillator,
    stopOscillator,
    play,
    stop,
  }
}
