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

function stopOperator(payload) {
  return {
    type: "STOP_OPERATOR",
    payload,
  }
}

function playOperator(payload) {
  return {
    type: "PLAY_OPERATOR",
    payload,
  }
}

function setWaveForm(payload) {
  return {
    type: "SET_WAVE_FORM",
    payload,
  }
}
