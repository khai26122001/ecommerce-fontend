// import { Button } from "antd"
import React from "react"
import { SearchOutlined } from '@ant-design/icons'
import InputComponents from "../InputComponents/InputComponents"
import ButtonComponents from "../ButtonComponents/ButtonComponents"

// trang này dùng để chỉnh css cho thanh tìm kiếm
const ButtonInputSearch = (props) => {
    const {
        size, placeholder, textButton,
        bordered, backgroundColorInput = '#fff',
        backgroundColorButton = '#5898C4',
        colorButton = '#fff',
    } = props

    return (
        <div style={{ display: 'flex', }}>
            {/* InputComponents nơi chứa input và button nhằm có thể tái sử dụng lại được  */}
            <InputComponents
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput, borderRadius: 0 }}
                // rải ra để nhận cái dữ liệu trên thanh input
                {...props}
            />
            {/* InputComponents nơi chứa input và button nhằm có thể tái sử dụng lại được  */}
            <ButtonComponents
                size={size}
                styleButon={{ background: backgroundColorButton, border: !bordered && 'none', borderRadius: 0 }}
                icon={<SearchOutlined style={{ color: colorButton }} />}
                textButton={textButton}
                styleTextButon={{ color: colorButton }}
            />
        </div>
    )
}

export default ButtonInputSearch