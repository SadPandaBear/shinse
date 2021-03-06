function Store(context, reducer) {
  context.suspend()
  let REHYDRATED_state

  function setupGlobalEventHandlers() {
    let keysPressed = {}
    window.addEventListener("keypress", (e) => {
      const key = e.key.toLowerCase()
      if (!keysPressed[key]) {
        keysPressed[key] = true
        if (key === "q") {
          dispatch(REHYDRATED_state)(playNote("C4"))
        } else if (key === "w") {
          dispatch(REHYDRATED_state)(playNote("E4"))
        } else if (key === "e") {
          dispatch(REHYDRATED_state)(playNote("G4"))
        }
      }
    })
    window.addEventListener("keyup", (e) => {
      const key = e.key.toLowerCase()
      keysPressed[key] = false
      if (key === "q") {
        dispatch(REHYDRATED_state)(stopNote("C4"))
      } else if (key === "w") {
        dispatch(REHYDRATED_state)(stopNote("E4"))
      } else if (key === "e") {
        dispatch(REHYDRATED_state)(stopNote("G4"))
      }
    })
  }

  function dispatch(state) {
    return ({ type, payload, effect }) => {
      const params = {
        action: { type, payload },
        context,
        state: REHYDRATED_state,
      }
      const newState = reducer(params)
      effect(newState, dispatch(newState), params)
      REHYDRATED_state = newState
    }
  }

  return (state) => {
    REHYDRATED_state = state
    setupGlobalEventHandlers()
    return {
      state,
      dispatch: dispatch(state),
    }
  }
}
