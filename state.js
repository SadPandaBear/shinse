const WaveType = {
  SINE: "sine",
  SQUARE: "square",
  SAWTOOTH: "sawtooth",
  TRIANGLE: "triangle",
}

const initialState = {
  oscillators: Array(4)
    .fill()
    .map(() => ({
      node: null,
      wave: {
        type: WaveType.SINE,
        frequency: 261.63,
      },
    })),
  masterGainNode: null,
  playing: false,
}
