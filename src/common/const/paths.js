// import { CONST } from "common/const"

export const HOME = () => {
  return "/"
}


export const BOARDS = () => {
  return "/boards"
}

export const BOARD_EDIT = (boardId = "") => {
  return `/boards/${boardId}`
}
