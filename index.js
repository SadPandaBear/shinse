window.AudioContext =
  window.webkitAudioContext || window.AudioContext || window.mozAudioContext

const main = (store) => () => {
  const audioContext = new AudioContext()
  const { state, ...actions } = store(audioContext)

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
    actions.addOscillator()
  })
}

document.addEventListener("DOMContentLoaded", main(Store(initialState)))
