const createOscillator = (context, oscillator) => {
  const osc = context.createOscillator()
  osc.connect(oscillator.gain).connect(context.destination)
  osc.type = oscillator.wave.type
  osc.frequency.value = oscillator.wave.frequency
  return osc
}
