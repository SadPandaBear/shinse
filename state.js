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
    volume: 0.3,
    wave: {
      type: WaveType.SINE,
      frequency: 261.63,
      detune: 0,
    },
    envelope: { a: 0.2, d: 0.4, s: 0.5, r: 0.4 },
    lfo: {
      type: WaveType.SINE,
      frequency: 0,
      detune: 0,
    },
  },
  playing: false,
}

const initialState = {
  operators: [initialOperator],
  playing: false,
  notes: [],
}
