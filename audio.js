const createOscillator = (context, settings) => {
  const osc = context.createOscillator()
  osc.type = settings.wave.type
  osc.frequency.value = settings.wave.frequency
  return osc
}

const createGain = (context, analyser) => {
  const masterGainNode = context.createGain()
  masterGainNode.connect(analyser)
  analyser.connect(context.destination)
  return masterGainNode
}

function Oscillator(context, settings) {
  const oscillator = createOscillator(context, settings)
  const analyser = context.createAnalyser()
  analyser.fftSize = 2048
  const gain = createGain(context, analyser)
  oscillator.connect(gain)
  return { 
    settings, 
    node: oscillator, 
    gain, analyser, 
    playing: false 
  }
}
