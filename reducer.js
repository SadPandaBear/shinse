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
      const oscillator = Oscillator(context, initialOscillator.settings)
      return {
        ...state,
        oscillators: [
          ...state.oscillators,
          oscillator
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
    case "SET_WAVE_FORM": {
      return {
        ...state,
        oscillators: state.oscillators.map(
          (oscillator, i) => {
            if(i === action.payload.index) {
              if(oscillator.playing) {
                oscillator.node.stop()
              }
              const osc = {...oscillator }
              osc.settings.wave.type = action.payload.type
              return {...Oscillator(context, osc.settings), playing: false}
            } else {
              return oscillator
            }
          }
        )
      }
    }
  }
}
