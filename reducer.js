function reducer({ action, state, context }) {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        playing: true,
      }
    case "STOP":
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
      return {
        ...state,
        notes: state.notes.filter(({ id }) => action.payload !== id),
      }
    case "PLAY_NOTE":
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: action.payload,
            operators: state.operators.map((op) => ({
              ...op,
              ...Operator(context, op.settings),
            })),
          },
        ],
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
            ? {
                ...Operator(context, operator.settings),
                playing: false,
                on: false,
              }
            : operator
        }),
      }
    case "SETUP_OPERATORS":
      return {
        ...state,
        operators: state.operators.map((op) => {
          return { ...op, ...Operator(context, op.settings) }
        }),
      }
    case "SET_WAVE_FORM": {
      return {
        ...state,
        operators: state.operators.map((operator, i) => {
          if (i === action.payload.index) {
            operator.oscillator.type = action.payload.type
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

            return op
          } else {
            return operator
          }
        }),
      }
    }
  }
}
