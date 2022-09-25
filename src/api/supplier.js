import requset from "../utils/requset";

//获取供应商列表与查询分页接口
const getSupplierList = (page,size,data) => {
    return requset({
        url:`supplier/list/search/${page}/${size}`,
        method:"POST",
        data
    })
}

// 删除供应商接口
const deleteSupplier = (id) => {
    return requset({
        url:`supplier/${id}`,
        method:"DELETE"
    })
}

// 添加供应商接口
const addSupplier = (data) => {
    return requset({
        url:"supplier",
        method:"POST",
        data
    })
}

// 编辑供应商接口
const editSupplier = (id,data) => {
    return requset({
        url:`supplier/${id}`,
        method:"PUT",
        data
    })
}

// 查询单个供应商接口
const findSupplier = (id) => {
    return requset({
        url:`supplier/${id}`,
        method:"GET"
    })
}


export default {
    getSupplierList,
    deleteSupplier,
    addSupplier,
    editSupplier,
    findSupplier
}