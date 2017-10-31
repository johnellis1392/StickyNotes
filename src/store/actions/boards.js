import { ACTION } from "common/const"
import { Promise } from "bluebird"


export const fetchBoards = ( /* params = {} */ ) => {
  return (dispatch /* , getState */ ) => {
    // const user = getState().auth.user

    dispatch({
      type: ACTION.BOARDS_FETCH,
    })

    dispatch({
      type: ACTION.BOARDS_FETCH_SUCCESS,
      payload: {},
    })

    return Promise.resolve()
  }
}
