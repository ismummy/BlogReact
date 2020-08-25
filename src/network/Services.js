import axios from "axios"

const user = JSON.parse(localStorage.getItem("user"))
const token = user ? user["authorization"] || "" : ""

axios.defaults.baseURL = "http://localhost:5000"
//axios.defaults.baseURL = "https://fichaya-server.herokuapp.com"

axios.defaults.headers.common["x-auth-token"] = token

export default class Services {
  static get (path) {
    return axios.get(path)
  }

  static put (path, data) {
    return axios({
      url: path,
      method: "PUT",
      data
    })
  }

  static post (path, data) {
    return axios({
      url: path,
      method: "POST",
      data
    })
  }
}
