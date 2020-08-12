const createOscillator = (context, { type, frequency }) => {
  const osc = context.createOscillator()
  osc.type = type
  osc.frequency.value = frequency
  return osc
}

const createGain = (context) => {
  const gain = context.createGain()
  return gain
}

const createAnalyser = (context) => {
  const analyser = context.createAnalyser()
  analyser.fftSize = Math.pow(2, 8)
  return analyser
}

function Operator(context, settings) {
  const oscillator = createOscillator(context, settings.wave)
  const gain = createGain(context)
  const analyser = createAnalyser(context)
  oscillator.connect(gain).connect(context.destination)
  gain.connect(analyser)
  return {
    settings,
    oscillator,
    gain,
    analyser,
  }
}
