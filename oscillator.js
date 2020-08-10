const createOscillator = (context, { oscillator, masterGainNode }) => {
  const osc = context.createOscillator()
  osc.connect(masterGainNode).connect(context.destination)
  osc.type = oscillator.wave.type

  osc.frequency.value = oscillator.wave.frequency
  return osc
}
