import { axiosJWT } from "./UserService"

// export const createOrder = async (data) => {
//     const res = await axios.post(`https://ecommerce-backend-dgl7.onrender.com/api/order/create`, data)
//     return res.data
// }

export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`http://localhost:3000/api/order/create`, data, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllOrderByUserId = async (id, access_token) => {
    console.log('id anh access_token', id, access_token)
    const res = await axiosJWT.get(`http://localhost:3000/api/order/get-all-order/${id}`, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const cancelOrder = async (id, access_token ) => {
    const res = await axiosJWT.delete(`http://localhost:3000/api/order/cancel-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
  }

  
export const getDetailsOrder = async (id,access_token) => {
const res = await axiosJWT.get(`http://localhost:3000/api/order/get-details-order/${id}`, {
    headers: {
        token: `Bearer ${access_token}`,
    }
})
return res.data
}
  
  
// làm trang quản lý đơn hàng
export const getAllOrder = async (access_token) => {
const res = await axiosJWT.get(`http://localhost:3000/api/order/get-all-order`, {
    headers: {
        token: `Bearer ${access_token}`,
    }
})
return res.data
}

  