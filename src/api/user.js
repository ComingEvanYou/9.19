import requset from "../utils/requset";

//登录接口
export const login = (data={}) => {
    return requset({
        url:'user/login',
        method:"POST",
        data
    })
}

//用户信息接口
export const getUser = () => {
    return requset({
        url:"user/info/admin",
        method:"GET",
    })
}

export const logout = () => {
    return requset({
        url:'user/logout',
        method:"POST"
    })
}