import { createReducer } from "common/utils"
import { ACTION } from "common/const"


const initialState = {
  processing: false,
  boards: [],
}


export default createReducer(initialState, {

  // Boards List
  [ACTION.BOARDS_FETCH]: (state) => {
    return {
      ...state,
      processing: true,
      boards: null,
    }
  },

  [ACTION.BOARDS_FETCH_SUCCESS]: (state, { boards } = {}) => {
    if (!boards) boards = state.boards
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


  // Single Board
  [ACTION.BOARD_FETCH]: (state) => {
    return {
      ...state,
      processing: true,
      selectedBoard: null,
    }
  },

  [ACTION.BOARD_FETCH_SUCCESS]: (state, { board } = {}) => {
    if (!board) board = null
    return {
      ...state,
      processing: false,
      selectedBoard: board,
    }
  },

  [ACTION.BOARD_FETCH_FAILURE]: (state, err = {}) => {
    return {
      ...state,
      processing: false,
      selectedBoard: null,
      err,
    }
  },

})
