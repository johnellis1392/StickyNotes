import { ACTION } from "const"

export const helloWorld = () => {
  return {
    type: ACTION.HELLO_WORLD,
    payload: {
      message: "Hello, World!",
    },
  }
}
