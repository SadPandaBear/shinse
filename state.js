const WaveType = {
  SINE: "sine",
  SQUARE: "square",
  SAWTOOTH: "sawtooth",
  TRIANGLE: "triangle",
}

const initialOscillator = {
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
  oscillators: [initialOscillator],
  playing: false,
}
