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
    effect: (newState, dispatch, { state, context }) => {
      if (newState.notes.length > 0) {
        const { id, operators } = newState.notes[newState.notes.length - 1]
        operators.forEach((op, index) => {
          if (op.on) {
            const { a, d, s, r, level } = op.settings.envelope
            const T = context.currentTime
            op.oscillator.frequency.value =
              payload === "C4" ? 261.63 : payload === "E4" ? 329.63 : 392.0
            op.oscillator.start()
            op.gain.gain.setValueAtTime(0, T)
            op.gain.gain.linearRampToValueAtTime(op.gain.gain.value, T + a)
            op.gain.gain.setTargetAtTime(level, T + a, d)
            op.gain.gain.setTargetAtTime(0, T, T + r)
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
    effect: (newState, dispatch, { state, context }) => {
      const note = state.notes.find(({ id }) => id === payload)
      note.operators.forEach((op, index) => {
        const { a, d, s, r } = op.settings.envelope
        const T = context.currentTime
        if (op.on) {
          op.gain.gain.cancelScheduledValues(T)
          op.gain.gain.setValueAtTime(op.gain.gain.value, T)
          op.gain.gain.setTargetAtTime(0, T, r)
        }
      })
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
