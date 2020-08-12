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
    envelope: { a: 0.1, d: 0.2, s: 0.5, r: 0.2, level: 0.3 },
  },
  playing: false,
}

const initialState = {
  operators: [initialOperator],
  playing: false,
  notes: [],
}
