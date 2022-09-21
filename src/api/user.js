import requset from "../utils/requset";

export const login = (data) => {
    return requset({
        url:'user/login',
        method:"POST",
        data
    })
}