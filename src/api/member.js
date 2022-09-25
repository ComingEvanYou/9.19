import requset from "../utils/requset";

//获取会员列表与查询分页接口
const getMemberList = (page,size,data) => {
    return requset({
        url:`member/list/search/${page}/${size}`,
        method:"POST",
        data
    })
}

// 删除会员接口
const deleteMember = (id) => {
    return requset({
        url:`member/${id}`,
        method:"DELETE"
    })
}

// 添加会员接口
const addMember = (data) => {
    return requset({
        url:"member",
        method:"POST",
        data
    })
}

// 编辑会员接口
const editMember = (id,data) => {
    return requset({
        url:`member/${id}`,
        method:"PUT",
        data
    })
}

// 查询单个会员接口
const findMember = (id) => {
    return requset({
        url:`member/${id}`,
        method:"GET"
    })
}


export default {
    getMemberList,
    deleteMember,
    addMember,
    editMember,
    findMember
}