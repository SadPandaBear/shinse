const createOscillator = (context, { type, frequency, detune }) => {
  const osc = context.createOscillator()
  osc.type = type
  osc.frequency.value = frequency
  osc.detune.value = detune
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

const createFilter = (context) => {
  const filter = context.createBiquadFilter()
  filter.type = "lowshelf"
  filter.frequency.value = 1000
  filter.gain.value = 2
  filter.detune.value = 100
  return filter
}

function Operator(context, settings) {
  const oscillator = createOscillator(context, settings.wave)
  const gain = createGain(context)
  const analyser = createAnalyser(context)
  const filter = createFilter(context)

  const lfo = createOscillator(context, settings.lfo)
  const lfoGain = createGain(context)
  const lfoFilter = createFilter(context)
  lfoGain.gain.value = 0

  lfoGain.connect(gain.gain)
  lfoFilter.connect(lfoGain)
  lfo.connect(lfoFilter)

  oscillator.connect(filter)
  filter.connect(gain)
  gain.connect(context.destination)
  gain.connect(analyser)

  return {
    settings,
    lfo: {
      oscillator: lfo,
      gain: lfoGain,
    },
    oscillator,
    gain,
    analyser,
  }
}
