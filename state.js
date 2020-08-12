const WaveType = {
  SINE: "sine",
  SQUARE: "square",
  SAWTOOTH: "sawtooth",
  TRIANGLE: "triangle",
}

const initialOperator = {
  oscillator: null,
  gain: null,
  analyser: null,
  settings: {
    volume: 0.5,
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
  notes: [],
}
