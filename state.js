const WaveType = {
  SINE: "sine",
  SQUARE: "square",
  SAWTOOTH: "sawtooth",
  TRIANGLE: "triangle",
  CUSTOM: "custom",
}

const initialState = {
  oscillators: [],
  masterGainNode: null,
  wave: {
    type: WaveType.SINE,
    frequency: 880,
  },
  playing: false,
}
