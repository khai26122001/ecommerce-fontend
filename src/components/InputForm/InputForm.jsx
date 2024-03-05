// import { Input } from "antd";
import React, { useState } from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
    const {placeholder = 'Nhap Text', ...rests } = props
    const handleOnChangeInput = (e) => {
        // nhận cái hàm này từ bên phía --SignInPage và SignUpPage--
        props.onChange(e.target.value)
    }

    return (
        // <WrapperInputStyle placeholder={placeholder} value={valueInput} {...rests} >
        // nhận --value-- từ --SignInPage và SignUpPage--
        <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnChangeInput} >
            
            {/* <span>Ẩn hiện</span> */}
        </WrapperInputStyle>
    )
}

export default InputForm