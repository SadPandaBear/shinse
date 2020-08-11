const WaveType = {
  SINE: "sine",
  SQUARE: "square",
  SAWTOOTH: "sawtooth",
  TRIANGLE: "triangle",
}

const initialOperator = {
  node: null,
  gain: null,
  analyser: null,
  settings: {
    wave: {
      type: WaveType.SINE,
      frequency: 261.63,
    },
  },
  playing: false,
}

const initialState = {
  operators: [initialOperator],
  playing: false,
}
