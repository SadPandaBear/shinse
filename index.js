window.AudioContext =
  window.webkitAudioContext || window.AudioContext || window.mozAudioContext

function render() {
  return [Play, AddOperator, Operators]
}

function update({ state, dispatch }) {
  const $app = document.getElementById("app")
  if ($app.innerHTML === "") {
    $app.innerHTML = "Loading..."
    dispatch(setupOperators())
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
