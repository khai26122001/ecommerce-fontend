import React from 'react'
import HeaderComponents from '../HeaderComponents/HeaderComponents'

// trang này dùng để điều chỉnh hiển thị phần header cho những trang nào
const DefaultComponents = ({children}) => {
    return (
        <div>
            {/* nhận cái header vào xử lý */}
            <HeaderComponents/>
            {children}
        </div>
    )
}

export default DefaultComponents