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
    case "ADD_OPERATOR":
      return {
        ...state,
        operators: [
          ...state.operators,
          Operator(context, initialOperator.settings),
        ],
      }
    case "PLAY_OPERATOR":
      state.operators[action.payload.index].oscillator.start()
      return {
        ...state,
        operators: state.operators.map((operator, i) => {
          return i === action.payload.index
            ? { ...operator, playing: true }
            : operator
        }),
      }
    case "STOP_OPERATOR":
      state.operators[action.payload.index].oscillator.stop()
      return {
        ...state,
        operators: state.operators.map((operator, i) => {
          return i === action.payload.index
            ? { ...Operator(context, operator.settings), playing: false }
            : operator
        }),
      }
    case "SETUP_OPERATORS":
      return {
        ...state,
        operators: state.operators.map(({ settings }) => {
          return Operator(context, settings)
        }),
      }
    case "SET_WAVE_FORM": {
      return {
        ...state,
        operators: state.operators.map((operator, i) => {
          if (i === action.payload.index) {
            if (operator.playing) {
              operator.oscillator.stop()
            }

            const op = {
              ...operator,
              settings: {
                ...operator.settings,
                wave: {
                  ...operator.settings.wave,
                  type: action.payload.type,
                },
              },
            }

            return { ...Operator(context, op.settings), playing: false }
          } else {
            return operator
          }
        }),
      }
    }
  }
}
