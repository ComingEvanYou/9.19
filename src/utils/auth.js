
const TOKEN_KEY = "token"
const USERINFO_KEY = "userInfo"

export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY,token)
}

export const getToken = () => {
   return localStorage.getItem(TOKEN_KEY)
}

export const setUserInfo = (userInfo) => {
    localStorage.setItem(USERINFO_KEY,JSON.stringify(userInfo))
}

export const getUserInfo = () => {
   return JSON.parse(localStorage.getItem(USERINFO_KEY) || "{}")
}

export const removeTokenAdduserInfo = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USERINFO_KEY)
}