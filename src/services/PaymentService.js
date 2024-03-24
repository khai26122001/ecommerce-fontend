import axios from "axios"

export const getConfig = async () => {
    const res = await axios.get(`https://ecommerce-backend-pgsx.onrender.com/api/payment/config`)
    return res.data
}
