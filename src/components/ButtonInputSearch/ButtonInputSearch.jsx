// import { Button } from "antd"
import React from "react"
import { SearchOutlined } from '@ant-design/icons'
import InputComponents from "../InputComponents/InputComponents"
import ButtonComponents from "../ButtonComponents/ButtonComponents"

// trang này dùng để chỉnh css cho thanh tìm kiếm
const ButtonInputSearch = (props) => {
    const {
        size, placeholder, textButton,
        bordered, backgroundColorInput = '#EDEDED',
        backgroundColorButton = '#EDEDED',
        colorButton = '#000',

    } = props

    return (
        <div style={{ display: 'flex', }}>
            {/* InputComponents nơi chứa input và button nhằm có thể tái sử dụng lại được  */}
            <InputComponents
                size={size}
                placeholder={placeholder}
                bordered={bordered}
                style={{ backgroundColor: backgroundColorInput, borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                // rải ra để nhận cái dữ liệu trên thanh input
                {...props}

            />
            {/* InputComponents nơi chứa input và button nhằm có thể tái sử dụng lại được  */}
            <ButtonComponents
                size={size}
                styleButon={{ background: backgroundColorButton, border: !bordered && 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}
                icon={<SearchOutlined style={{ color: colorButton, marginRight: '0px' }} />}
                textButton={textButton}
                styleTextButon={{ color: colorButton }}
            />
        </div>
    )
}

export default ButtonInputSearch