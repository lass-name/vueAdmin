import modules from './modules'
import server from '@/server'

const state = {}

const getters = {}

const actions = {
  add ({commit}, playload) {
    return server.request(commit, playload, '')
  }
}

const mutations = {}

export default{
  state,
  getters,
  actions,
  mutations,
  modules
}
