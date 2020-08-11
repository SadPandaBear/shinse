function reducer({ action, state, context }) {
  switch (action.type) {
    case "PLAY":
      context.resume()
      return {
        ...state,
        playing: true,
      }
    case "STOP":
      context.suspend()
      return {
        ...state,
        playing: false,
      }
    case "ADD_OSCILLATOR":
      return {
        ...state,
        oscillators: [
          ...state.oscillators,
          Oscillator(context, initialOscillator.settings),
        ],
      }
    case "PLAY_OSCILLATOR":
      state.oscillators[action.payload.index].node.start()
      return {
        ...state,
        oscillators: state.oscillators.map((oscillator, i) => {
          return i === action.payload.index
            ? { ...oscillator, playing: true }
            : oscillator
        }),
      }
    case "STOP_OSCILLATOR":
      state.oscillators[action.payload.index].node.stop()
      return {
        ...state,
        oscillators: state.oscillators.map((oscillator, i) => {
          return i === action.payload.index
            ? { ...Oscillator(context, oscillator.settings), playing: false }
            : oscillator
        }),
      }
    case "SETUP_OSCILLATORS":
      return {
        ...state,
        oscillators: state.oscillators.map(({ settings }) => {
          return Oscillator(context, settings)
        }),
      }
  }
}
