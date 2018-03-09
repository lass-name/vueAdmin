'use strict'
import axios from 'axios'

let _options = {
  baseURL: '/api',
  method: 'get',
  timeout: 5000,
  transformRequest: [function (data, headers) {
    return data
  }]
  // transformResponse: [function (data) {
  //   // console.log(data)
  //   return JSON.parse(data)
  // }]
}

let api = {
  request: (commit, options, mutation) => {
    return new Promise((resolve, reject) => {
      axios({..._options, ...options}).then(res => {
        commit(mutation, res)
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  axios
}

export default api
