import "whatwg-fetch"
import Promise from "bluebird"
// import { getAuthService } from './AuthService'
import _ from "underscore"


export const call = (method, endpoint, params = {}) => {
  const fetchObj = { method }
  if (["POST", "PUT", "PATCH"].includes(method)) {
    fetchObj.headers = { "Content-Type": "application/json" }
    fetchObj.body = JSON.stringify(params)
  } else {
    fetchObj.headers = {}
    if (_.keys(params).length > 0) {
      endpoint += "?" + _.map(params, (val, key) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join("&")
    }
  }


  // const auth = getAuthService()
  // fetchObj.headers.Authorization = auth.getToken()

  return new Promise((resolve, reject) => {
    fetch(`/api${endpoint}`, fetchObj).then((response) => {
      if (response.status === 204) return Promise.resolve()
      else return response.json().then((data) => {
        if (response.status === 401 && data.code === "SESSION_EXPIRED") {
          // getAuthService().logout()
          return Promise.reject("session expired")
        } else if (response.status >= 200 && response.status < 400) {
          return data
        } else {
          return Promise.reject({
            status: response.status,
            code: data.code,
          })
        }
      }, ( /* err */ ) => {
        return Promise.reject({
          status: response.status,
        })
      })
    }).then(resolve, reject)
  })
}
