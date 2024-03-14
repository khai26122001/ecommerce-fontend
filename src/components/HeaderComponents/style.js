import { Row } from "antd"
import styled from "styled-components"


// nay cho thanh cuốn header có thể duy chuyển dx
export const WrapperHeaderAo = styled(Row)`
    height: 60px;
    width: 100%;
`



// trang này dùng để chỉnh css cho header
// flex-wrap:nowrap; để ko xuống dòng được

// nay cho thanh cuốn header có thể duy chuyển dx
// position: fixed;
// top: 0;
// width: 100%; 
// z-index: 1000;
export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: #fff;
    gap: 16px;
    align-items: center;
    flex-wrap:nowrap;


    
    position: fixed;
    top: 0;
    width: 100%; 
    z-index: 1000;
`

export const WrapperTextHeader = styled.span`
    font-size: 35px;
    color: #000;
    font-weight: bold;
    text-align: left;
    cursor: pointer;
    margin-left: 70px;

`

export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
`
// white-space: nowrap;: để mấy cái giỏ hàng ko bị rớt 
export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    white-space: nowrap;
    cursor: 'pointer';
    color: #000;
`

export const WrapperIconHeader = styled.span`
    font-size: 30px;
    color: #fff;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`
export const WrapperUnderlined = styled.div`
    width: 90%; 
    height: 1px; 
    background-color: #EDEDED; 
    margin: auto;
    margin-top: 10px;
`