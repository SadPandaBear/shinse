function setupOperators() {
  return {
    type: "SETUP_OPERATORS",
    effect: (newState, dispatch) => {
      update({ state: newState, dispatch })
    },
  }
}

function play() {
  return {
    type: "PLAY",
    effect: (newState, dispatch, { context }) => {
      context.resume()
      updateContainer(Play({ state: newState, dispatch }))
    },
  }
}

function stop() {
  return {
    type: "STOP",
    effect: (newState, dispatch, { context }) => {
      context.suspend()
      updateContainer(Play({ state: newState, dispatch }))
    },
  }
}

function addOperator() {
  return {
    type: "ADD_OPERATOR",
    effect: (newState, dispatch) => {
      updateContainer(Operators({ state: newState, dispatch }))
    },
  }
}

function turnOperatorOff(payload) {
  return {
    type: "TURN_OPERATOR_OFF",
    payload,
    effect: (newState, dispatch, { state }) => {
      state.operators.forEach((operator) => {
        if (operator.playing) {
          operator.oscillator.stop()
        }
      })
      updateContainer(Operators({ state: newState, dispatch }))
    },
  }
}

function turnOperatorOn(payload) {
  return {
    type: "TURN_OPERATOR_ON",
    payload,
    effect: (newState, dispatch) => {
      updateContainer(Operators({ state: newState, dispatch }))
    },
  }
}

function playNote(payload) {
  return {
    type: "PLAY_NOTE",
    payload,
    effect: (newState, dispatch, { state }) => {
      if (newState.notes.length > 0) {
        const { id, operators } = newState.notes[newState.notes.length - 1]
        operators.forEach((op, index) => {
          if (op.on) {
            op.oscillator.frequency.value =
              payload === "C4" ? 261.63 : payload === "E4" ? 329.63 : 392.0
            op.oscillator.start()
            updateContainer(Oscilloscope({ analyser: op.analyser, index }))
          }
        })
      }
    },
  }
}

function stopNote(payload) {
  return {
    type: "STOP_NOTE",
    payload,
    effect: (newState, dispatch, { state }) => {
      const note = state.notes.find(({ id }) => id === payload)
      if (note) {
        note.operators.forEach((op, index) => {
          if (op.on) {
            op.oscillator.stop()
          }
        })
      }
    },
  }
}

function setWaveForm(payload) {
  return {
    type: "SET_WAVE_FORM",
    payload,
    effect: (newState, dispatch) => {},
  }
}
