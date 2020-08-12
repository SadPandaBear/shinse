function setupOperators() {
  return {
    type: "SETUP_OPERATORS",
  }
}

function play() {
  return {
    type: "PLAY",
  }
}

function stop() {
  return {
    type: "STOP",
  }
}

function addOperator() {
  return {
    type: "ADD_OPERATOR",
  }
}

function turnOperatorOff(payload) {
  return {
    type: "TURN_OPERATOR_OFF",
    payload,
  }
}

function turnOperatorOn(payload) {
  return {
    type: "TURN_OPERATOR_ON",
    payload,
  }
}

function playNote(payload) {
  return {
    type: "PLAY_NOTE",
    payload,
  }
}

function stopNote(payload) {
  return {
    type: "STOP_NOTE",
    payload,
  }
}

function setWaveForm(payload) {
  return {
    type: "SET_WAVE_FORM",
    payload,
  }
}
