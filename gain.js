const createGain = (context, analyser) => {
  const masterGainNode = context.createGain()
  masterGainNode.connect(analyser)
  analyser.connect(context.destination)
  return masterGainNode
}
