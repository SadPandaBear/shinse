function Store(context, reducer) {
  context.suspend()
  let DANGEROUS_state

  function setupGlobalEventHandlers() {
    document.addEventListener("keypress", (e) => {
      const key = e.key.toLowerCase()
      if (key === "q") {
        dispatch(DANGEROUS_state)(playNote())
      }
    })
    document.addEventListener("keyup", (e) => {
      const key = e.key.toLowerCase()
      if (key === "q") {
        dispatch(DANGEROUS_state)(stopNote())
      }
    })
  }

  function dispatch(state) {
    return ({ type, payload }) => {
      return dispatchEvent(
        new CustomEvent("UPDATE_STORE", {
          detail: { action: { type, payload }, context, state },
        }),
      )
    }
  }

  addEventListener("UPDATE_STORE", (e) => {
    const newState = reducer(e.detail)
    DANGEROUS_state = newState
    update({
      state: newState,
      dispatch: dispatch(newState),
    })
  })

  return (state) => {
    setupGlobalEventHandlers()
    return {
      state,
      dispatch: dispatch(state),
    }
  }
}
