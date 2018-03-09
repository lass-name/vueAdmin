import server from '@/server'
import * as types from '../mutation-type'

const state = {
  ganks: []
}

const getters = {
  ganks: state => state.ganks
}

const actions = {
  getGanks ({commit}, playload) {
    return server.request(commit, playload, types.GANK_GET_ALL_DATA)
  }
}

const mutations = {
  [types.GANK_GET_ALL_DATA] (state, {data}) {
    state.ganks = data.results
  }
}

export default {
  state, getters, actions, mutations
}
