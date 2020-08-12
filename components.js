function Button({ id, onClick, title }) {
  const $elem = document.createElement("button")
  $elem.id = id
  $elem.innerHTML = title
  $elem.onclick = onClick
  return $elem
}

function Play({ state, dispatch }) {
  return Button({
    id: "play",
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

function AddOperator({ dispatch }) {
  return Button({
    id: "add-operator",
    onClick: () => {
      dispatch(addOperator())
    },
    title: "Add Operator",
  })
}

function ChangeWave({ index, type, dispatch }) {
  const $select = document.createElement("select")
  $select.id = `change-wave-${index}`
  const $options = Object.values(WaveType).map((val) => {
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

function Operators({ state: { operators }, dispatch }) {
  const $container = document.createElement("div")
  $container.id = "operators"
  const $elems = operators.map((operator, index) => {
    const $elem = document.createElement("div")
    const $input = document.createElement("input")
    $input.type = "checkbox"
    $input.checked = operator.on
    $input.onchange = (e) => {
      if (!operator.on) {
        dispatch(turnOperatorOn({ index }))
      } else {
        dispatch(turnOperatorOff({ index }))
      }
    }
    $elem.appendChild(
      ChangeWave({ index, type: operator.settings.wave.type, dispatch }),
    )
    $elem.appendChild(Oscilloscope({ index, analyser: operator.analyser }))
    $elem.appendChild($input)
    return $elem
  })

  $container.append(...$elems)
  return $container
}

function Envelope({ adsr, dispatch }) {
  const $elem = document.createElement("div")
  return $elem
}

function updateContainer($el) {
  const $rendered = document.getElementById($el.id)
  $rendered.parentNode.replaceChild($el, $rendered)
}
