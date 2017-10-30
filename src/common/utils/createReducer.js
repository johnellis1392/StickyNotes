export const createReducer = (initialState, reducerMap) => {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type]
    if (!reducer) return state
    return reducer(state, action.payload)
  }
}

export default createReducer
