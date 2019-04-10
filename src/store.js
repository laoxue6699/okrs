import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {},
    isAdmin: false,
    isLogin: false
  },
  mutations: {
    setuserinfo: function (state, info) {
      state.userinfo = info
    },
    setisAdmin: function (state, val) {
      state.isAdmin = val
    },
    setisLogin: function (state, val) {
      state.isLogin = val
    }
  },
  actions: {

  }
})
