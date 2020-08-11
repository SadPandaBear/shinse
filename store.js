function Store(context, reducer) {
  context.suspend()

  function dispatch(state) {
    return ({ type, payload }) => {
      return dispatchEvent(
        new CustomEvent("UPDATE_STORE", {
          detail: { action: { type, payload }, context, state },
        })
      )
    }
  }

  addEventListener("UPDATE_STORE", (e) => {
    const newState = reducer(e.detail)
    update({
      state: newState,
      dispatch: dispatch(newState),
    })
  })

  return (state) => {
    return {
      state,
      dispatch: dispatch(state),
    }
  }
}
