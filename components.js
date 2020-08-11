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

function ChangeWave({ index, type, dispatch }) {
  const $select = document.createElement("select")
  const $options = Object.values(WaveType).map(val => {
    const $option = document.createElement("option")
    $option.value = val
    $option.text = val
    return $option
  })
  $select.onchange = (e) => {
    dispatch(setWaveForm({ index, type: e.target.value }))
  }
  $select.append(...$options)
  $select.value = type
  return $select
}

function Oscillators({ oscillators, dispatch }) {
  const $container = document.createElement("div")

  const $elems = oscillators.map((oscillator, index) => {
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
    $elem.appendChild(ChangeWave({ index, type: oscillator.settings.wave.type, dispatch }))
    $elem.appendChild(Oscilloscope({ analyser: oscillator.analyser }))
    $elem.appendChild($input)
    return $elem
  })

  $container.append(...$elems)
  return $container
}
