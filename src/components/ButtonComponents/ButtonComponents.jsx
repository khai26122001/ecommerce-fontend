import React from "react"
import { Button } from "antd"

// đây là nơi dùng để chưa input và buttom sau này nhằm tái sử dụng
// bên phía --ButtonInputSearch.jsx-- gọi tới --ButtonComponents-- rồi chuyền các các tham số
// -- size, styleButon, styleTextButon, textButton, ...rests -- vào để xử lý
// ...rests: chuyền các tham số đặc biệt khác vào như ở đây là --icon--
const ButtonComponents = ({ size, styleButon, styleTextButon, textButton, ...rests}) => {
    return (
        <Button 
            size={size} 
            style={styleButon}
            // icon={icon}
            // dùng để nhận cái icon
            {...rests}
        >
            <span style={styleTextButon}>{textButton}</span> 
        </Button>
    )
}

export default ButtonComponents