window.AudioContext =
  window.webkitAudioContext || window.AudioContext || window.mozAudioContext

const main = (eff) => () => {
  const audioContext = new AudioContext()
  const oscillators = document.getElementById("oscillators")

  const { state, ...actions } = eff(audioContext)

  actions.init()
  updateOscillatorBoxes()

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

  function updateOscillatorBoxes() {
    state.oscillators.forEach((_, i) => {
      const elem = document.createElement("input")
      elem.type = "checkbox"
      elem.addEventListener("change", function (e) {
        if (e.target.checked) {
          actions.playOscillator(i)
        } else {
          actions.stopOscillator(i)
        }
      })
      oscillators.insertAdjacentElement("beforeend", elem)
    })
  }

  const btnAddOscillator = document.getElementById("add-oscillator")
  btnAddOscillator.addEventListener("click", function () {
    oscillators.innerHTML = ""
    actions.addOscillator()
    updateOscillatorBoxes()
  })
}

document.addEventListener("DOMContentLoaded", main(Effects(initialState)))
