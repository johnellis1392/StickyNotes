import { createReducer } from "common/utils"
import { ACTION } from "common/const"

const initialState = {
  processing: false,
}


export default createReducer(initialState, {
  [ACTION.BOARDS_FETCH]: (state) => {
    return {
      ...state,
      processing: true,
    }
  },

  [ACTION.BOARDS_FETCH_SUCCESS]: (state, { boards } = {}) => {
    return {
      ...state,
      processing: false,
      boards,
    }
  },

  [ACTION.BOARDS_FETCH_FAILURE]: (state, err = {}) => {
    return {
      ...state,
      processing: false,
      boards: null,
      err,
    }
  },
})
