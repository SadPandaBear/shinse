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
    envelope: { a: 1, d: 1, s: 1, r: 1, level: 0.3 },
  },
  playing: false,
}

const initialState = {
  operators: [initialOperator],
  playing: false,
  notes: [],
}
