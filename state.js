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
  lfo: null,
  settings: {
    volume: 1,
    wave: {
      type: WaveType.SINE,
      frequency: 261.63,
    },
    envelope: { a: 1, d: 1, s: 1, r: 1 },
    lfo: {
      type: WaveType.SINE,
      frequency: 2,
    }
  },
  playing: false,
}

const initialState = {
  operators: [initialOperator],
  playing: false,
  notes: [],
}
