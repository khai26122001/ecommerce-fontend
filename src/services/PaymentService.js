import axios from "axios"

export const getConfig = async () => {
    const res = await axios.get(`https://ecommerce-backend-dgl7.onrender.com/api/payment/config`)
    return res.data
}
