window.AudioContext =
  window.webkitAudioContext || window.AudioContext || window.mozAudioContext

const main = (initialState, eff) => () => {
  const audioContext = new AudioContext()

  const sineTerms = new Float32Array([0, 0, 1, 0, 1])
  const cosineTerms = new Float32Array(sineTerms.length)
  const customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms)

  const state = Object.assign(initialState, {
    masterGainNode: createGain(audioContext),
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

  const elems = ["osc1", "osc2", "osc3", "osc4"].map((e) =>
    document.getElementById(e),
  )
  elems.forEach((e, i) => {
    e.addEventListener("change", function (e) {
      if (e.target.checked) {
        effects.playOscillator(i)
      } else {
        effects.stopOscillator(i)
      }
    })
  })
}

document.addEventListener("DOMContentLoaded", main(initialState, Effects))
