import modules from './modules'
import server from '@/server'
import * as types from './mutation-type'

const state = {
  siteMap: []
}

const getters = {
  siteMap: state => state.siteMap
}

const actions = {
  add ({commit}, playload) {
    return server.request(commit, playload, types.BASE_ACTION_NO_STATE)
  },
  setSiteMap ({commit}, playload) {
    commit(types.BASE_SET_SITE_MAP, playload)
  }
}

const mutations = {
  [types.BASE_SET_SITE_MAP] (state, data) {
    state.siteMap = data
  },
  [types.BASE_ACTION_NO_STATE] (state, data) {}
}

export default{
  state,
  getters,
  actions,
  mutations,
  modules
}
