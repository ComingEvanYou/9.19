import Vue from 'vue'
import Vuex from 'vuex'
import { getToken , getUserInfo ,setToken , setUserInfo} from "../utils/auth"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    userInfo:""
  },
  getters: {
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token
      setToken(token)
    },
    SET_USERINFO(state,userInfo){
      state.userInfo = userInfo
      setUserInfo(userInfo)
    }
  },
  actions: {
    DIS_SET_TOKEN({commit},token){
      commit('SET_TOKEN',token)
    },
    DIS_SET_USERINFO({commit},userInfo){
      commit('SET_USERINFO',userInfo)
    }
  },
  modules: {
  }
})
