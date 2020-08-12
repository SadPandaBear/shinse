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
    effect: (newState, dispatch) => {
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
      state.operators.forEach((op, index) => {
        if (!op.playing && op.on) {
          op.oscillator.start()
          updateContainer(Oscilloscope({ analyser: op.analyser, index }))
        }
      })
    },
  }
}

function stopNote(payload) {
  return {
    type: "STOP_NOTE",
    payload,
    effect: (newState, dispatch, { state }) => {
      state.operators.forEach((op) => {
        if (op.playing && op.on) {
          op.oscillator.stop()
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
