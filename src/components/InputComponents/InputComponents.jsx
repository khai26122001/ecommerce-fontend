import React from "react"
import { Input } from "antd"

// đây là nơi dùng để chưa input và buttom sau này nhằm tái sử dụng
// bên phía --ButtonInputSearch.jsx-- gọi tới --InputComponents-- rồi chuyền các các tham số
// -- size, placeholder, bordered, style, ...rests -- vào để xử lý
// ...rests: chuyền các tham số đặc biệt khác vào
const InputComponents = ({ size, placeholder, bordered, style, ...rests  }) => {
    return (
        <Input
            size={size} 
            placeholder={placeholder} 
            bordered={bordered}
            style={style}
            {...rests}
        />
    )
}

export default InputComponents