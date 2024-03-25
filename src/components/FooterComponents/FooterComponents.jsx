import React from 'react';
import logoo from '../../assets/images/LOGOO.webp'
import { Image } from 'antd';
import { WrapperUnderlined } from './style'
import { useNavigate } from 'react-router-dom';


const FooterComponents = () => {
    const navigate = useNavigate()
    return (
        <footer style={{ backgroundColor: '#fff', color: "#000" }}>
            <WrapperUnderlined></WrapperUnderlined>
            <Image key='logoo' src={logoo} alt="logoo" preview={false}
                style={{ position: 'absolute', top: "40px", left: "20px", width: "400px", height: "150px" }}
            />
            <div style={{ maxWidth: '350px', margin: "auto", marginTop: '50px', marginBottom: '40px' }}>
                <div className="row" style={{ width: "800px" }}>
                    <div >
                        <h3 style={{ color: "#000", marginBottom: "10px" }}>Thông tin liên hệ</h3>
                        <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ, Quốc gia</p>
                        <p>Điện thoại: +123 456 789</p>
                        <p>Email: info@example.com</p>
                    </div>
                    <div style={{ marginTop: '-120px', marginLeft: '400px' }}>
                        <h3 style={{ color: "#000", marginBottom: "10px" }}>Liên kết nhanh</h3>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            <li style={{ marginBottom: "10px" }}><a onClick={() => { navigate('/') }} style={{ textDecoration: "none", transition: "color 0.3s ease" }}>Trang chủ</a></li>
                            <li style={{ marginBottom: "10px" }}><a onClick={() => { navigate('/SiteMap') }} style={{  textDecoration: "none", transition: "color 0.3s ease" }}>Site Map</a></li>
                            <li style={{ marginBottom: "10px" }}><a onClick={() => { navigate('/introduction') }} style={{  textDecoration: "none", transition: "color 0.3s ease" }}>Giới thiệu</a></li>
                            <li style={{ marginBottom: "10px" }}><a onClick={() => { navigate('/') }} style={{  textDecoration: "none", transition: "color 0.3s ease" }}>Sản phẩm</a></li>
                            <li style={{ marginBottom: "10px" }}><a onClick={() => { navigate('/contact') }} style={{  textDecoration: "none", transition: "color 0.3s ease" }}>Liên hệ</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: "#ccc", padding: "20px 0" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <p style={{ color: "#000", margin: 0, textAlign: "center" }}>© 2024 Tất cả các quyền đã được bảo lưu. Designed by Your Company</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    )
}


export default FooterComponents
