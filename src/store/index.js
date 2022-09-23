import Vue from 'vue'
import Vuex from 'vuex'
import { getToken , getUserInfo ,setToken , setUserInfo} from "../utils/auth"
import { login, getUser , logout} from "../api/user";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:  getToken() || "",
    userInfo: getUserInfo()||''
  },
  getters: {
    token(state){
      return state.token
    },
    userInfo(state){
      return state.userInfo
    }
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
    // DIS_SET_TOKEN({commit},token){
    //   commit('SET_TOKEN',token)
    // },
    // DIS_SET_USERINFO({commit},userInfo){
    //   commit('SET_USERINFO',userInfo)
    // }

    async loginMethods({commit},token){
      try{
        const response = await login(token)
      commit('SET_TOKEN',response.token)
      return response.token
      }catch(e){
        console.log(e.message)
      }
    },
    async handleUser ({commit},userInfo){
      try{
        const user = await getUser(userInfo)
      commit('SET_USERINFO',user)
      return user
      }catch(e){
        console.log(e.message)
      }
    },
    async handleLogout ({commit}){
      try{
        const response = await logout()
        commit('SET_TOKEN','')
        commit('SET_USERINFO','')
        return response
      }catch{

      }
    }
  },
  modules: {
  }
})
