import requset from "../utils/requset";

//获取员工列表与查询分页接口
const getStaffList = (page,size,data) => {
    return requset({
        url:`staff/list/search/${page}/${size}`,
        method:"POST",
        data
    })
}

// 删除员工接口
const deleteStaff = (id) => {
    return requset({
        url:`staff/${id}`,
        method:"DELETE"
    })
}

// 添加员工接口
const addStaff = (data) => {
    return requset({
        url:"staff",
        method:"POST",
        data
    })
}

// 编辑员工接口
const editStaff = (id,data) => {
    return requset({
        url:`staff/${id}`,
        method:"PUT",
        data
    })
}

// 查询单个员工接口
const findStaff = (id) => {
    return requset({
        url:`staff/${id}`,
        method:"GET"
    })
}


export default {
    getStaffList,
    deleteStaff,
    addStaff,
    editStaff,
    findStaff
}