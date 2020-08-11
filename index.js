window.AudioContext =
  window.webkitAudioContext || window.AudioContext || window.mozAudioContext

const btnPlayer = document.getElementById("player")
const btnAddOscillator = document.getElementById("add-oscillator")

const render = (state, actions) => {
  const elemns = document.getElementById("oscillators")
  elemns.innerHTML = ''
  state.oscillators.forEach((oscillator, i) => {
    const elem = document.createElement("input")
    elem.type = "checkbox"
    elem.checked = oscillator.playing
    const oscilloscope = Oscilloscope(oscillator.analyser, i)
    oscilloscope.init()
    elem.addEventListener("change", function (e) {
      btnAddOscillator.disabled = e.target.checked
      if (e.target.checked) {
        actions.playOscillator(i)
      } else {
        actions.stopOscillator(i)
      }
    })
    elemns.insertAdjacentElement("beforeend", elem)
  })
}

const main = (store) => () => {
  const audioContext = new AudioContext()
  const { state, ...actions } = store(audioContext)

  actions.init()
  render(state, actions)

  btnPlayer.addEventListener("click", function (e) {
    btnAddOscillator.disabled = !state.playing
    if (!state.playing) {
      actions.play()
      btnPlayer.innerText = "Stop"
    } else {
      actions.stop()
      btnPlayer.innerText = "Play"
    }
    render(state, actions)
  })

  btnAddOscillator.addEventListener("click", function (e) {
    actions.addOscillator()
    render(state, actions)
  })
}

document.addEventListener("DOMContentLoaded", main(Store(initialState)))
