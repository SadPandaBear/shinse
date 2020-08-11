window.AudioContext =
  window.webkitAudioContext || window.AudioContext || window.mozAudioContext

const main = (eff) => () => {
  const audioContext = new AudioContext()
  const { state, ...actions } = eff(audioContext)

  actions.init()

  const btnPlayer = document.getElementById("player")
  btnPlayer.addEventListener("click", function () {
    if (!state.playing) {
      actions.play()
      btnPlayer.innerText = "Stop"
    } else {
      actions.stop()
      btnPlayer.innerText = "Play"
    }
  })

  const btnAddOscillator = document.getElementById("add-oscillator")
  btnAddOscillator.addEventListener("click", function () {
    oscillators.innerHTML = ""
    actions.addOscillator()
  })
}

document.addEventListener("DOMContentLoaded", main(Effects(initialState)))
