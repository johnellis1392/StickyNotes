import { createReducer } from "common/utils"
import { ACTION } from "common/const"

const initialState = {
  processing: false,
}


export default createReducer(initialState, {
  [ACTION.HELLO_WORLD]: (state, payload = {}) => {
    return {
      ...state,
      processing: false,
      message: payload.message,
    }
  },
})
