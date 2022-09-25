import requset from "../utils/requset";

//获取会员列表与查询分页接口
const getGoodsList = (page,size,data) => {
    return requset({
        url:`goods/list/search/${page}/${size}`,
        method:"POST",
        data
    })
}

// 删除会员接口
const deleteGoods = (id) => {
    return requset({
        url:`goods/${id}`,
        method:"DELETE"
    })
}

// 添加会员接口
const addGoods = (data) => {
    return requset({
        url:"goods",
        method:"POST",
        data
    })
}

// 编辑会员接口
const editGoods = (id,data) => {
    return requset({
        url:`goods/${id}`,
        method:"PUT",
        data
    })
}

// 查询单个会员接口
const findGoods = (id) => {
    return requset({
        url:`goods/${id}`,
        method:"GET"
    })
}


export default {
    getGoodsList,
    deleteGoods,
    addGoods,
    editGoods,
    findGoods
}