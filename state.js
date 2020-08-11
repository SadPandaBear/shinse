const WaveType = {
  SINE: "sine",
  SQUARE: "square",
  SAWTOOTH: "sawtooth",
  TRIANGLE: "triangle",
}

const initialOscillator = {
  node: null,
  wave: {
    type: WaveType.SINE,
    frequency: 261.63,
  },
  gain: null,
  analyser: null,
  playing: false
}

const initialState = {
  oscillators: [initialOscillator],
  playing: false,
}
