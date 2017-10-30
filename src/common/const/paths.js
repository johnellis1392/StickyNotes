// import { CONST } from "common/const"

export const HOME = () => {
  return "/"
}

export const DATA = (path) => {
  if (path) return `/data/${path}`
  else return "/data"
}

export const PAGES = () => {
  return DATA("pages")
}
