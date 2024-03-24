import axios from "axios"

// khi dúng getDetail mình sẽ dùng cái thằng này
// để cho khi mình gọi tới GetDetail thì sẽ gọi tới --Userservice.axiosJWT
export const axiosJWT = axios.create()

// đây là nơi chứa tất cả call API của user 

// export const updateUser = async (id, data, access_token) => {
//     // phải bỏ cái --axiosJWT-- để tránh --access_token-- hết hạn nó sẽ lỗi 
//     const res = await axiosJWT.put(`http://localhost:3000/api/user/update-user/${id}`, data, {
//     // const res = await axios.put(`http://localhost:3000/api/user/update-user/${id}`, data, {
//         // này dùng để làm chỉ có user đó hoặc là admin mới có quyền xửa thông tin
//         headers: {
//             token: `Brearer ${access_token}`,
//         }
//     })
//     return res.data
// }

export const getAllComment = async (data) => {
    const res = await axios.post(`http://localhost:3000/api/comment/getAllComment`, data)
    return res.data
}

// export const deleteUser = async (id, access_token) => {
//     const res = await axiosJWT.delete(`http://localhost:3000/api/user/delete-user/${id}`, {
//         headers: {
//             token: `Brearer ${access_token}`,
//         }
//     })
//     return res.data
// }

export const createComment = async (data) => {
    const res = await axios.post(`http://localhost:3000/api/comment/create-comment`, data)
    return res.data
}