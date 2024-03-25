import React from 'react';

const ContactPage = () => {
    return (
        <div style={{
            fontFamily: "Arial, sans-serif",
            margin: 0,
            padding: 0,
            backgroundColor: "#f4f4f4"
        }}>
            <div style={{ marginTop: "20px", backgroundColor: "#fff", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", padding: "20px" }}>
                <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}><a style={{ color: 'red' }}>Tư vấn online, nhận ngay ưu đãi</a></h2>
                <p style={{ marginBottom: "10px", textAlign: "center" }}>Chỉ cần một cuộc gọi miễn phí,</p>
                <p style={{ marginBottom: "10px", textAlign: "center" }}>ưu đãi độc quyền online này dành riêng cho bạn</p>
                <p style={{ marginBottom: "20px", textAlign: "center" }}>Hotline <a>1800545457</a> Hotline <a>1800545457</a> gọi ngay</p>
                <p style={{ textAlign: "center" }}>(Vui lòng nhấn phím 1 để chọn ngôn ngữ tiếng việt, tiếp tục nhấn phím 1 để gặp ngay nhân viên tư vấn)</p>
            </div>

            <div style={{
                width: '100%',
                backgroundColor: "#fff",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                padding: "20px"
            }}>

                <div className="contact-info">

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.657400296614!2d106.67857667502663!3d10.837508758064084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529753ae5c629%3A0x7ac31b6fbac383d9!2zMjA4IMSQLiBMw6ogxJDhu6ljIFRo4buNLCBQaMaw4budbmcgMTUsIEfDsiBW4bqlcCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1711356780999!5m2!1svi!2s"
                        width="100%" height="400" style={{ border: 0, borderRadius: "5px" }} allowFullScreen=""
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

        </div>
    );
};

export default ContactPage;
