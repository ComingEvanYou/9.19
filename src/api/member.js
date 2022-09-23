import requset from "../utils/requset";

//获取会员列表与查询分页接口
const getMenberList = (page,size,data) => {
    return requset({
        url:`member/list/search/${page}/${size}`,
        method:"POST",
        data
    })
}

// 删除会员接口

// 添加会员接口

// 编辑会员接口

// 查询单个会员接口


export default {
    getMenberList
}