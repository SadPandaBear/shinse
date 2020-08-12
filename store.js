function Store(context, reducer) {
  context.suspend()
  let REHYDRATRED_state = initialState

  function setupGlobalEventHandlers() {
    window.addEventListener("keypress", (e) => {
      const key = e.key.toLowerCase()
      if (!e.repeat) {
        if (key === "q") {
          dispatch(REHYDRATRED_state)(playNote())
        }
      }
    })
    window.addEventListener("keyup", (e) => {
      dispatch(REHYDRATRED_state)(stopNote())
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
    const params = { ...e.detail, state: REHYDRATRED_state }
    const newState = reducer(params)
    e.detail.effect(newState, dispatch(newState), params)
    REHYDRATRED_state = newState
  })

  return (state) => {
    setupGlobalEventHandlers()
    return {
      state,
      dispatch: dispatch(state),
    }
  }
}
