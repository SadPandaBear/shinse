window.AudioContext =
  window.webkitAudioContext || window.AudioContext || window.mozAudioContext

const main = (initialState, eff) => () => {
  const audioContext = new AudioContext()
  audioContext.suspend()
  const analyser = audioContext.createAnalyser()

  const oscilloscope = Oscilloscope(analyser)
  oscilloscope.init()

  const state = Object.assign(initialState, {
    masterGainNode: createGain(audioContext, analyser),
  })
  const effects = eff(state, audioContext)

  const btnPlayer = document.getElementById("player")
  btnPlayer.addEventListener("click", function () {
    if (!state.playing) {
      effects.play()
      btnPlayer.innerText = "Stop"
    } else {
      effects.stop()
      btnPlayer.innerText = "Play"
    }
  })

  const btnOscillator = document.getElementById("oscillator")
  btnOscillator.addEventListener("change", function (e) {
    if (e.target.checked) {
      effects.playOscillator()
    } else {
      effects.stopOscillator()
    }
  })
}

document.addEventListener("DOMContentLoaded", main(initialState, Effects))
