import React from 'react';
import slider1 from '../../assets/images/slider1.webp'
import slider2 from '../../assets/images/slider2.webp'

const IntroductionPage = () => {
    return (
        <div style={{
            fontFamily: "Arial, sans-serif",
            margin: 0,
            padding: 0,
            backgroundColor: "#f4f4f4",
            display: "flex",
            justifyContent: "center"
        }}>
            {/* Tấm hình quảng cáo trái */}
            <div style={{ marginLeft: "50px", marginTop: '20px', marginBottom: '20px' }}>
                <img src={slider1} alt="Quảng cáo trang sức" style={{ width: "180px", height: '600px', borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }} />
            </div>

            <div style={{
                maxWidth: "800px",
                margin: "50px auto",
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
            }}>

                <h1 style={{ textAlign: "center", color: "#333", borderBottom: "2px solid #333", paddingBottom: "10px" }}>Về chúng tôi</h1>
                <p style={{ lineHeight: "1.6", color: "#555", marginBottom: "20px" }}>
                    Chào mừng bạn đến với <span style={{ color: "#ff7f50", fontWeight: "bold" }}>Trang Sức Tinh Hoa</span> - nơi bạn có thể tìm thấy những món đồ trang sức tinh tế và độc đáo nhất.
                    Chúng tôi tự hào là một trong những địa chỉ mua sắm trực tuyến hàng đầu về trang sức, với hơn một thập kỷ kinh nghiệm trong ngành.
                </p>
                <p style={{ lineHeight: "1.6", color: "#555", marginBottom: "20px" }}>
                    Nguồn gốc của chúng tôi bắt đầu từ đam mê với nghệ thuật trang sức và mong muốn mang lại sự đẹp và tự tin cho mỗi phụ nữ.
                    Chúng tôi chọn kỹ lưỡng từng mảnh đá quý và vật liệu cao cấp để tạo ra những sản phẩm trang sức chất lượng nhất.
                </p>
                <p style={{ lineHeight: "1.6", color: "#555", marginBottom: "20px" }}>
                    Được thành lập từ năm 2000, <span style={{ color: "#ff7f50", fontWeight: "bold" }}>Trang Sức Tinh Hoa</span> đã nhanh chóng trở thành một trong những thương hiệu hàng đầu trong ngành trang sức.
                    Chúng tôi không chỉ cung cấp các sản phẩm chất lượng mà còn tạo ra những trải nghiệm mua sắm trực tuyến tuyệt vời cho khách hàng.
                </p>
                <p style={{ lineHeight: "1.6", color: "#555", marginBottom: "20px" }}>
                    Với mục tiêu đem đến sự hài lòng tuyệt đối cho khách hàng, chúng tôi luôn cam kết cung cấp dịch vụ chăm sóc khách hàng tốt nhất,
                    sản phẩm chất lượng và một trải nghiệm mua sắm trực tuyến an toàn và thuận tiện.
                </p>
                <p style={{ lineHeight: "1.6", color: "#555" }}>
                    Hãy khám phá thế giới của <span style={{ color: "#ff7f50", fontWeight: "bold" }}>Trang Sức Tinh Hoa</span> ngay hôm nay và tìm thấy món đồ trang sức hoàn hảo cho bản thân bạn hoặc người thân yêu!
                </p>
            </div>

            {/* Tấm hình quảng cáo phải */}
            <div style={{ marginRight: "50px", marginTop: '20px', marginBottom: '20px' }}>
                <img src={slider2} alt="Quảng cáo trang sức" style={{ width: "180px", height: '600px', borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }} />
            </div>
        </div>
    );
};

export default IntroductionPage;
