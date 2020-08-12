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
    case "STOP_NOTE":
      state.operators.forEach((op) => {
        if (op.playing) {
          op.oscillator.stop()
        }
      })

      return {
        ...state,
        operators: state.operators.map((op) => ({
          ...Operator(context, op.settings),
          playing: false,
          on: op.on,
        })),
      }
    case "PLAY_NOTE":
      state.operators.forEach((op) => {
        if (!op.playing) {
          op.oscillator.start()
        }
      })

      return {
        ...state,
        operators: state.operators.map((op) => ({ ...op, playing: true })),
      }
    case "TURN_OPERATOR_ON":
      return {
        ...state,
        operators: state.operators.map((operator, i) => {
          return i === action.payload.index
            ? { ...operator, on: true }
            : operator
        }),
      }
    case "TURN_OPERATOR_OFF":
      return {
        ...state,
        operators: state.operators.map((operator, i) => {
          return i === action.payload.index
            ? { ...Operator(context, operator.settings), on: false }
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

            return { ...Operator(context, op.settings), on: false }
          } else {
            return operator
          }
        }),
      }
    }
  }
}
