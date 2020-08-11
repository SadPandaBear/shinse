function setupOscillators() {
  return {
    type: "SETUP_OSCILLATORS",
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

function addOscillator() {
  return {
    type: "ADD_OSCILLATOR",
  }
}

function stopOscillator(payload) {
  return {
    type: "STOP_OSCILLATOR",
    payload,
  }
}

function playOscillator(payload) {
  return {
    type: "PLAY_OSCILLATOR",
    payload,
  }
}

function setWaveForm(payload) {
  return {
    type: "SET_WAVE_FORM",
    payload,
  }
}
