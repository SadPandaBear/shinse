function Button({ onClick, title }) {
  const $elem = document.createElement("button")
  $elem.innerHTML = title
  $elem.onclick = onClick
  return $elem
}

function Play({ state, dispatch }) {
  return Button({
    onClick: () => {
      if (!state.playing) {
        dispatch(play())
      } else {
        dispatch(stop())
      }
    },
    title: !state.playing ? "Play" : "Stop",
  })
}

function AddOscillator({ dispatch }) {
  return Button({
    onClick: () => {
      dispatch(addOscillator())
    },
    title: "AddOscillator",
  })
}

function Oscillators({ oscillators, dispatch }) {
  const $container = document.createElement("div")

  oscillators
    .map((oscillator, index) => {
      const $elem = document.createElement("div")
      const $input = document.createElement("input")
      $input.type = "checkbox"
      $input.checked = oscillator.playing
      $input.onchange = (e) => {
        if (!oscillator.playing) {
          dispatch(playOscillator({ index }))
        } else {
          dispatch(stopOscillator({ index }))
        }
      }
      $elem.appendChild(Oscilloscope({ analyser: oscillator.analyser }))
      $elem.appendChild($input)
      return $elem
    })
    .forEach(($elem) => $container.appendChild($elem))

  return $container
}
