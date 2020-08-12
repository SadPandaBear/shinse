function Store(context, reducer) {
  context.suspend()
  let REHYDRATED_state = initialState

  function setupGlobalEventHandlers() {
    let keysPressed = {}
    window.addEventListener("keypress", (e) => {
      const key = e.key.toLowerCase()
      if (!keysPressed[key]) {
        keysPressed[key] = true
        if (key === "q") {
          dispatch(REHYDRATED_state)(playNote("C4"))
        } else if (key === "w") {
          dispatch(REHYDRATED_state)(playNote("D5"))
        }
      }
    })
    window.addEventListener("keyup", (e) => {
      const key = e.key.toLowerCase()
      keysPressed[key] = false
      if (key === "q") {
        dispatch(REHYDRATED_state)(stopNote("C4"))
      } else if (key === "w") {
        dispatch(REHYDRATED_state)(stopNote("D5"))
      }
    })
  }

  function dispatch(state) {
    return ({ type, payload, effect }) => {
      return dispatchEvent(
        new CustomEvent("UPDATE_STORE", {
          detail: { action: { type, payload }, context, state, effect },
        }),
      )
    }
  }

  addEventListener("UPDATE_STORE", (e) => {
    const params = { ...e.detail, state: REHYDRATED_state }
    const newState = reducer(params)
    e.detail.effect(newState, dispatch(newState), params)
    REHYDRATED_state = newState
  })

  return (state) => {
    setupGlobalEventHandlers()
    return {
      state,
      dispatch: dispatch(state),
    }
  }
}
