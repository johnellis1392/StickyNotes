import { ACTION } from "common/const"
import { Promise } from "bluebird"
import _ from "underscore"


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


export const fetchBoard = (boardId = null) => {
  return (dispatch, getState) => {
    // const user = getState().auth.user
    if (!boardId) return Promise.resolve()

    dispatch({
      type: ACTION.BOARD_FETCH,
    })


    const store = getState()
    const board = _.find(store.boards.boards, ({ id }) => id === boardId)

    dispatch({
      type: ACTION.BOARD_FETCH_SUCCESS,
      payload: {
        board,
      }
    })
  }
}
