const createOscillator = (context, { wave: { type, frequency }, ...state }) => {
  const osc = context.createOscillator()
  osc.connect(state.masterGainNode).connect(context.destination)

  if (type == WaveType.CUSTOM) {
    osc.setPeriodicWave(customWaveform)
  } else {
    osc.type = WaveType.SINE
  }

  osc.frequency.value = frequency
  return osc
}
