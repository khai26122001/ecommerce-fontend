import React from 'react'
import HeaderComponents from '../HeaderComponents/HeaderComponents'
import FooterComponents from '../FooterComponents/FooterComponents'

// trang này dùng để điều chỉnh hiển thị phần header cho những trang nào
const DefaultComponents = ({children}) => {
    return (
        <div>
            {/* nhận cái header vào xử lý */}
            <HeaderComponents/>
            {children}
            <FooterComponents/>
        </div>
    )
}

export default DefaultComponents