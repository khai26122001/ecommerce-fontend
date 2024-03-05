import React from "react";
import ProductDetailsComponents from "../../components/ProductDetailsComponents/ProductDetailsComponents";
import { useNavigate, useParams } from "react-router-dom";


const ProductDetailsPage = () => {
    // sẽ dùng cái thằng này để lấy ra --id của product-- này
    const { id } = useParams()
    // console.log('parasm-id', id)

    // chuyển trang
    const navigate = useNavigate()

    return (
        <div style={{ height: '100vh', width: '100%', background: '#efefef' }}>
            {/* <div style={{ padding: '0 120px', background: '#efefef', height: '1000px' }}> */}
            <div style={{ width: '1270px', height: '100%', margin: '0 auto' }}>
                <h6 style={{ color: "#efefef" }}>-</h6>
                
                <h3 ><span onClick={() => navigate('/')} style={{ cursor: 'pointer', fontWeight: 'bold' }}>Trang chủ</span> - Chi tiết sản phẩm</h3>
                {/* sau khi có --id-- ta sẽ chuyền vào */}
                <ProductDetailsComponents idProduct={id} />
            </div>
        </div>
    )
}

export default ProductDetailsPage