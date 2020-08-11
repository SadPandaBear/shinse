window.AudioContext =
  window.webkitAudioContext || window.AudioContext || window.mozAudioContext

function render() {
  return [
    Play,
    AddOscillator,
    (props) => Oscillators({ ...props.state, ...props }),
  ]
}

function update({ state, dispatch }) {
  const $app = document.getElementById("app")
  if ($app.innerHTML === "") {
    $app.innerHTML = "Loading..."
    dispatch(setupOscillators())
  } else {
    const $elems = render()

    $app.innerHTML = ""
    $elems
      .map(($el) => $el({ state, dispatch }))
      .forEach(($el) => {
        $app.appendChild($el)
      })
  }
}

const audioContext = new AudioContext()
const store = Store(audioContext, reducer)

const main = (store) => () => {
  update(store(initialState))
}

document.addEventListener("DOMContentLoaded", main(store))
