import styled from "styled-components"
import { Col } from "antd"

// justify-content: center; muốn chỉnh giữa thì bỏ ái này vào
export const WrapperProducts = styled.div`
    display: flex;
    gap: 35px;
    margin-top: 20px;
    flex-wrap: wrap;

`

export const WrapperNavbar = styled(Col)`
    background: #fff;
    margin-right: 10px;
    padding: 10px;
    border-radius: 6px;
    height: fit-content;
    margin-top: 20px;
    width: 200px;
    
`